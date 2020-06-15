$charset = 'const CharacterSet = {'
Get-ChildItem -af -Filter *.jpg | ForEach-Object {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($_.FullName)
    $base64 = [convert]::tobase64string([io.file]::readallbytes($_.FullName))
    $charset += " '$name' : 'data:image/png;base64,$base64',`r`n"
}
$charset += '}'
$charset