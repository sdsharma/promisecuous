#!/bin/sh
git checkout master
git reset --hard
git pull origin master
npm run-script build
firebase deploy -P default --token "1/btTr3nVl7-SUQOpW2MdmLqMnhT1xcIzPNYic9YSdr_0"