#!/bin/sh
git checkout master
git reset --hard
git pull origin master
ng build --prod
firebase deploy --token "1/btTr3nVl7-SUQOpW2MdmLqMnhT1xcIzPNYic9YSdr_0"