function doPost(e) {
  var line = JSON.parse(e.postData.contents).events[0];
  var token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN'); //ここにAccessTokenを入力してください
  var reply_token= JSON.parse(e.postData.contents).events[0].replyToken;
  var user_id= line.source.userId; //userIdです
  var group_id= line.source.groupId; //groupIdです
  if (user_id != undefined ) {var profile = get_profile(user_id);} //グループで取得する場合と個人チャットで取得する2パターンを同時に行う場合は7-9行目とget_profile関数を少し書き換える必要があります
  var negi_sheet = SpreadsheetApp.openById("シートID"); //シートにログを記録する必要がない場合はこの行を消してください(その際はログを記録しているコードも消してください)
  var today = new Date(); //日時を出したい時に使ってください
  
switch (line.type) {
    case 'follow': //追加された際にGoogleのスプレッドシートに誰に追加されたかログを記録するようにしています
      negi_sheet.appendRow([user_id,profile['displayName'],"追加された",today,profile['pictureUrl']]);
      break;
    case 'join': //グループに招待された場合はログ記録＆参加したグループにメッセージを送るようにしています
      negi_sheet.appendRow([group_id,"グループに参加した",today]); 
              var url = 'https://api.line.me/v2/bot/message/reply';
        UrlFetchApp.fetch(url, {
          'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token,
          },
          'method': 'post',
          'payload': JSON.stringify({
            'replyToken': reply_token,
            'messages': [{
              'type': 'text',
              'text': "よろしく٩( 'ω' )و",
            }],
          }),
        });
      break;
    case 'message': //message event
      var user_message = JSON.parse(e.postData.contents).events[0].message.text;  
          var kokoni = /^ここにメッセージ$/; //自分は正規表現でメッセージを判別してます。この場合は最初の文字が「こ」で最後の文字が「ジ」の場合の「ここにメッセージ」を含むメッセージ、つまり完全に一致するメッセージの場合をif文で書いてます
      if(kokoni.test(user_message)){ //正規表現はググれば結構出てくるのでそちらを参考に 〜を含むという場合は正規表現は不要です
        var url = 'https://api.line.me/v2/bot/message/reply';
        UrlFetchApp.fetch(url, {
          'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token,
          },
          'method': 'post',
          'payload': JSON.stringify({
            'replyToken': reply_token,
            'messages': [{
              'type': 'text',
              'text': "ここに返すメッセージ", //「ここにメッセージ」を送信した際に返されるメッセージです
              //'text': "これuserId→" + userId,  //例えばuserIdを返したい場合はこう記載します
            }],
          }),
        });
      }
    default:
      break;
  }
} 



function push(){ //pushが使えるのはDeveloper Trialのみです
            var url = "https://api.line.me/v2/bot/message/push";
          var headers = {
            "Content-Type" : "application/json; charset=UTF-8",
            'Authorization': 'Bearer ここにアクセストークン', //関数をまたぐので上とは別にトークンを書く必要があります
          };
          
          var postData = {
            "to" : "ここに宛先のuserId", //この辺は公式のリファレンスを参考にしてください https://developers.line.me/ja/docs/messaging-api/reference/#anchor-0c00cb0f42b970892f7c3382f92620dca5a110fc
            "messages" : [
              {
                'type':'text',
                'text':"test",
              }
            ]
          };
         
          var options = {
            "method" : "post",
            "headers" : headers,
            "payload" : JSON.stringify(postData)
          };
          return UrlFetchApp.fetch(url, options); 
}

// Get Profile for LINE
function get_profile(userid) {
  var token = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN'); 
  var url = 'https://api.line.me/v2/bot/profile/' + userid;
  var headers = {'Authorization': 'Bearer ' + token};
  var options = {'headers' : headers};
  var response = UrlFetchApp.fetch(url, options);
  var content = JSON.parse(response.getContentText());  
  return content;  
}
