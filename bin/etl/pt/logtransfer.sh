#!/bin/sh
#xm渠道也作为--type "core_alipayrecord_db"传入
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_account.csv" --token '{{token}}' --type "core_account_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_aliorder.csv" --token '{{token}}' --type "core_aliorder_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_alipayrecord.csv" --token '{{token}}' --type "core_alipayrecord_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_arenaresult.csv" --token '{{token}}' --type "core_arenaresult_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_card.csv" --token '{{token}}' --type "core_card_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_firstlott.csv" --token '{{token}}' --type "core_firstlott_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_hunt.csv" --token '{{token}}' --type "core_hunt_db"
bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_mine.csv" --token '{{token}}' --type "core_mine_db"
