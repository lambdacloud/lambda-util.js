#!/bin/bash
for f in *.csv ; do
  node ../../bin/etl/pt/pt2lambdacloud -H 'api.lambdacloud.com' --file "$f" --token '2E83B154-33ED-4087-836E-AC77A88C7BF8' --type "${f%.csv}_db"
done
