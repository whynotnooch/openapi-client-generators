#!env sh

if [ ! -f "$1" ]; then
  workingFile=$(mktemp)

  echo "Downloading OpenAPI spec at $1..."
  curl -s -o "$workingFile" "$1"
  if [ $? != "0" ]; then
    echo "Download failed."

    exit;
  fi
else
  workingFile=$1
fi

jsonFile=$workingFile
if [ "$3" = "yaml" ]; then
  jsonFile=$(mktemp)
  echo "Converting OpenAPI into TS..."
  yq -p yaml -o json "$workingFile" > "$jsonFile"
  if [ $? != "0" ]; then
    echo "Converting YAML to JSON failed."

    exit;
  fi
fi

echo -E "declare const schema: $(cat $jsonFile); export default schema;" > $2