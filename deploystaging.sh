#!/bin/sh
if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
	firebase deploy -P staging --token $FIREBASE_TOKEN
fi