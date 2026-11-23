-- Apply once in your own Supabase project. No existing tables are altered.
create table public.attention_documents (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null,
 revision bigint not null default 1,
 updated_at timestamptz not null default now(),
 check (jsonb_typeof(payload) = 'object' and octet_length(payload::text) <= 10485760)
);
alter table public.attention_documents enable row level security;
create policy owner_read on public.attention_documents for select to authenticated using (user_id = (select auth.uid()));
grant select on public.attention_documents to authenticated;
revoke insert, update, delete on public.attention_documents from anon, authenticated;
-- Atomic compare-and-swap prevents one device silently overwriting another.
create function public.attention_save(expected_revision bigint, new_payload jsonb) returns bigint
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); next_revision bigint;
begin
 if uid is null then raise exception 'authentication_required'; end if;
 if new_payload is null
    or jsonb_typeof(new_payload) is distinct from 'object'
    or new_payload->>'format' is distinct from 'attention-backup'
    or new_payload->>'version' is distinct from '2'
    or jsonb_typeof(new_payload->'tasks') is distinct from 'array'
    or jsonb_typeof(new_payload->'roadmaps') is distinct from 'array'
    or jsonb_typeof(new_payload->'sessions') is distinct from 'array'
    or jsonb_typeof(new_payload->'preferences') is distinct from 'object'
    then raise exception 'invalid_document'; end if;
 if expected_revision = 0 then
  insert into public.attention_documents(user_id,payload) values(uid,new_payload) on conflict do nothing returning revision into next_revision;
 else
  update public.attention_documents set payload=new_payload, revision=revision+1, updated_at=now() where user_id=uid and revision=expected_revision returning revision into next_revision;
 end if;
 if next_revision is null then raise exception 'revision_conflict'; end if;
 return next_revision;
end $$;
revoke all on function public.attention_save(bigint,jsonb) from public,anon;
grant execute on function public.attention_save(bigint,jsonb) to authenticated;
