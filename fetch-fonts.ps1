$ErrorActionPreference = 'Stop'
$assetDirectory = Join-Path $PSScriptRoot 'dist\assets\fonts'
New-Item -ItemType Directory -Path $assetDirectory -Force | Out-Null
$fontUrl = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap'
$fontCss = (Invoke-WebRequest -Uri $fontUrl -Headers @{ 'User-Agent' = 'Mozilla/5.0 AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36' }).Content
$fontUrls = [regex]::Matches($fontCss, 'https://fonts\.gstatic\.com/[^)]+') | ForEach-Object { $_.Value } | Select-Object -Unique
$fontIndex = 0
foreach ($fontAssetUrl in $fontUrls) {
    $fontIndex++
    $extension = [IO.Path]::GetExtension(([Uri]$fontAssetUrl).AbsolutePath)
    $fontName = 'font-' + $fontIndex + $extension
    Invoke-WebRequest -Uri $fontAssetUrl -OutFile (Join-Path $assetDirectory $fontName)
    $fontCss = $fontCss.Replace($fontAssetUrl, './' + $fontName)
}
[IO.File]::WriteAllText((Join-Path $assetDirectory 'fonts.css'), $fontCss)
Write-Output "Downloaded $fontIndex font subsets."
