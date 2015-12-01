#!/bin/bash
for f in *.csv ; do
  node ../../bin/etl/pt/pt2lambdacloud -H 'api.lambdacloud.com' --file "$f" --token 'pt_token' --type "${f%.csv}_db"
done
