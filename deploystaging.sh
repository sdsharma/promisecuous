#!/bin/sh
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
	npm run-script build-dev
	firebase deploy -P staging --token $FIREBASE_TOKEN
fi