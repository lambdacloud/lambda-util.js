#!/bin/sh
#xm渠道也作为--type "core_alipayrecord_db"传入
#push core_aliorder, core_alipayrecord, core_arenaresult, core_firstlott, core_hunt, core_mine into shanghai
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_aliorder.csv" --token $1 --type "core_aliorder_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_alipayrecord.csv" --token $1 --type "core_alipayrecord_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_arenaresult.csv" --token $1 --type "core_arenaresult_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_firstlott.csv" --token $1 --type "core_firstlott_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_hunt.csv" --token $1 --type "core_hunt_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptlog2lambdacloud -H 'api.lambdacloud.com' --file "core_mine.csv" --token $1 --type "core_mine_db"

#push core_arena,core_daylott,core_freelott,core_user into shanghai
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_account.csv" --token $1 --type "core_account_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_arena.csv" --token $1 --type "core_arena_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_card.csv" --token $1 --type "core_card_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_daylott.csv" --token $1 --type "core_daylott_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_freelott.csv" --token $1 --type "core_freelott_db"
~/sunyonggang/lambda-util.js/bin/etl/pt/ptdata2lambdacloud -H 'api.lambdacloud.com' --file "core_user.csv" --token $1 --type "core_user_db"

