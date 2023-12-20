#!/bin/bash

FLUTTER_VERSION=$(/snap/bin/flutter doctor)
echo "{\"flutterVersion\": \"$FLUTTER_VERSION\"}"
