PennController.ResetPrefix(null);
//PennController.DebugOff(); Delete the slashes before running the experiment


Sequence("consent_form","initiate-recorder", "recording_test", "introduction",
    "introduction_long_1", "good_example","bad_example_1", "introduction_long_2",
    "bad_example_2", "bad_example_3", "practice_long_intro", "practice_long",
    "practice_long_exit", randomize("exp_long"), "break", "introduction_short",
    "practice_short", "practice_short_exit", randomize("exp_short"),
    "exit_form1", "send_results", "exit");

let replaceConsentMic = ()=>{
        let consentLink = $(".PennController-PennController a.Message-continue-link");
        if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
            consentLink.html("同意する");
        else
            window.requestAnimationFrame( replaceConsentMic );
};
window.requestAnimationFrame( replaceConsentMic );

const replaceUploadingErrorMessage = ()=>{
    const uploadingErrorMessage = $(".PennController-PennController p:nth-child(2)");
    if (uploadingErrorMessage.length > 0 && uploadingErrorMessage[0].innerHTML.match(/^There was an error uploading the recordings:/))
        uploadingErrorMessage.html("サーバーにデータをアップロードする際に問題が発生しました。<br>下のリンクから録音データをダウンロードしてください。ダウンロードしたファイルは、解凍せずにファイル名を'[クラウドワーカー名]_[参加者ID]'とした上で、https://ter.ps/clearuploadにアップロードしてください。(例:田中太郎_hd8kT37g)")
            .siblings(".Message-continue-link").html("録音データをダウンロードする");
    else
        window.requestAnimationFrame( replaceUploadingErrorMessage );
};
replaceUploadingErrorMessage();




function getRandomStr(){
    const LENGTH = 4
    const SOURCE = "abcdefghijklmnopqrstuvwxyz"
    let result = ''

    for(let i=0; i<LENGTH; i++){
        result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }

  return result
}

const subject_id = getRandomStr()

newTrial("consent_form",
    newHtml("consent", "consent.html")
        .settings.checkboxWarning("Required")
        .settings.radioWarning("Required")
        .settings.inputWarning("Required")
        .print()
        .log()
    ,
    newButton("実験に参加することに同意します。")
        .print()
        .wait(
            getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() ))
).setOption("hideProgressBar", true);

InitiateRecorder("https://hjpatt-136.umd.edu/Web_Experiments/Phillips/Masato/PCIbex.php",
    "この実験プログラムは音声を録音し、記録します。<strong>このプログラムが録音機器を使用している間は、ページ上部に「Recording」と表示されます。</strong>この実験プログラムが実験参加者様の録音機器にアクセスすることに同意していただける場合には、下の「同意する」をクリックしてください。"
    )
    .setOption("hideProgressBar", true)
    .label("initiate-recorder");

newTrial("recording_test",
    newText("この実験では録音を行います。実験を始める前に、録音のテストをしてください。")
        .bold()
        .print()
    ,
    newText("「これはテストです。」という音声を録音してください。")
        .print()
    ,
    newText("下の「Record」ボタンを押すと録音が始まり、「Stop」ボタンを押すと停止します。ご自分の音声が録音されたか確かめるためには、再生ボタンを押してください。<br><br>")
        .print()
    ,
    newMediaRecorder("test-recorder", "audio")
        .print()
    ,
    newText("<br>ご自分の音声がはっきりと録音されていることを確かめてから次に進んでください。<br>")
        .print()
    ,
    newText("実験中には自動で録音が開始・停止します。録音中は画面の上部に赤色の背景で<strong>Recording</strong>と表示されます。<br><br>")
        .print()
    ,
    newButton("continue", "次へ進む")
    .print()
    .wait(
        getMediaRecorder("test-recorder").test.recorded()
            .failure(
                newText("次へ進む前に、きちんと録音できているか確認してください。")
                    .color("red")
                    .print())
      )
).setOption("hideProgressBar", true);





newTrial("introduction",
    newHtml("introduction.html")
        .print()
    ,
    newButton("次に進む")
        .print()
        .wait()
).setOption("hideProgressBar", true);

//////////////////


newTrial("introduction_long_1",
    newHtml("long_1.html")
        .print()
    ,
    newButton("良い例と悪い例を見る")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);

newTrial("good_example",
    newText("example","良い例")
        .css({"font-size":"20","border": "solid 1px black","position":"absolute", "left":"30%","top":"20%"})
        .print("left at 0em")
    ,
    newText("cross","+")
        .css({"font-size":"40","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(800)
        .start()
        .wait()
    ,
    getText("cross")
        .remove()
    ,
    newText("stimulus", "会社員が")
        .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(1600)
        .start()
        .wait()
    ,
    getText("stimulus")
        .css({"color":"red"})
        .refresh()
    ,
    newTimer(200)
        .start()
        .wait()
    ,
    newAudio("good","kitaku_0.m4a")
        .play()
    ,
    newTimer(1000)
        .start()
        .wait()
    ,
    getText("stimulus")
        .remove()
    ,
    newTimer(2000)
        .start()
        .wait()
    ,
    getText("example")
        .remove()
    ,
    newText("スペースキーを押して次に進んでください。")
        .css({"position":"absolute", "top":"35%"})
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);

newTrial("bad_example_1",
    newText("example","悪い例")
        .css({"font-size":"20","border": "solid 1px black","position":"absolute", "left":"30%","top":"20%"})
        .print("left at 0em")
    ,
    newText("cross","+")
        .css({"font-size":"40","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(800)
        .start()
        .wait()
    ,
    getText("cross")
        .remove()
    ,
    newText("stimulus", "会社員が")
        .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(600)
        .start()
        .wait()
    ,
    newAudio("bad","kitaku_0.m4a")
        .play()
    ,
    newTimer(1000)
        .start()
        .wait()
    ,
    getText("stimulus")
        .css({"color":"red"})
        .refresh()
    ,
    newTimer(1200)
        .start()
        .wait()
    ,
    getText("stimulus")
        .remove()
    ,
    newTimer(2000)
        .start()
        .wait()
    ,
    getText("example")
        .remove()
    ,
    newText("スペースキーを押して次に進んでください。")
        .css({"position":"absolute", "top":"35%"})
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);

newTrial("introduction_long_2",
    newHtml("long_2.html")
        .print()
    ,
    newButton("悪い例を見る")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);

//
newTrial("bad_example_2",
    newText("example","悪い例")
        .css({"font-size":"20","border": "solid 1px black","position":"absolute", "left":"30%","top":"20%"})
        .print("left at 0em")
    ,
    newText("cross","+")
        .css({"font-size":"40","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(800)
        .start()
        .wait()
    ,
    getText("cross")
        .remove()
    ,
    newText("stimulus", "会社員が")
        .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(1600)
        .start()
        .wait()
    ,
    getText("stimulus")
        .css({"color":"red"})
        .refresh()
    ,
    newAudio("bad","kitaku_1.m4a")
        .play()
    ,
    newTimer(1200)
        .start()
        .wait()
    ,
    getText("stimulus")
        .remove()
    ,
    newTimer(2000)
        .start()
        .wait()
    ,
    getText("example")
        .remove()
    ,
    newText("スペースキーを押して次に進んでください。")
        .css({"position":"absolute", "top":"35%"})
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);

//

newTrial("bad_example_3",
    newText("example","悪い例")
        .css({"font-size":"20","border": "solid 1px black","position":"absolute", "left":"30%","top":"20%"})
        .print("left at 0em")
    ,
    newText("cross","+")
        .css({"font-size":"40","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(800)
        .start()
        .wait()
    ,
    getText("cross")
        .remove()
    ,
    newText("stimulus", "会社員が")
        .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
        .print()
    ,
    newTimer(1600)
        .start()
        .wait()
    ,
    getText("stimulus")
        .css({"color":"red"})
        .refresh()
    ,
    newAudio("bad","kitaku_2.m4a")
        .play()
    ,
    newTimer(1200)
        .start()
        .wait()
    ,
    getText("stimulus")
        .remove()
    ,
    newTimer(2000)
        .start()
        .wait()
    ,
    getText("example")
        .remove()
    ,
    newText("スペースキーを押して次に進んでください。")
        .css({"position":"absolute", "top":"35%"})
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);

newTrial( "practice_long_intro",
    newText("実験の前半に関する説明は以上です。続いて練習を行っていただきます。なお、練習では音声は録音されません。<br><br>")
        .print()
    ,
    newButton("練習を始める")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);

Template(
    GetTable("practice.csv")
        .filter( row => row.limit == "long")
    , row =>
    newTrial("practice_long",
        newText("cross","+")
            .css({"font-size":"40","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(800)
            .start()
            .wait()
        ,
        getText("cross")
            .remove()
        ,
        newText("stimulus", row.context)
            .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(1600)
            .start()
            .wait()
        ,
        getText("stimulus")
            .css({"color":"red"})
            .refresh()
        ,

        newTimer(1200)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        newText("スペースキーを押して次に進んでください。")
            .css({"position":"absolute", "top":"35%"})
            .print()
        ,
        newKey(" ")
            .wait()
    ).setOption("hideProgressBar", true)
)

newTrial( "practice_long_exit",
    newText("以上で練習は終わりです。スペースキーを押すと実験の前半が始まりますので、準備ができたら始めてください。")
        .print()
    ,
    newText("前半が終わったところで一度休憩を取っていただきますが、 「スペースキーを押して次に進んでください」と表示されている間であれば、いつでも短い休憩を取っていただいて構いません。")
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);



// Body of the long condition
Template(
    GetTable("myTable.csv")
        .filter( row => row.limit == "long")
    , row =>
    newTrial("exp_long",
        newText("cross","+")
            .css({"font-size":"40","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(800)
            .start()
            .wait()
        ,
        getText("cross")
            .remove()
        ,
        newText("stimulus", row.context)
            .css({"font-size":"40", "color":"black","position":"absolute", "top":"40%"})
            .print()
        ,
        newMediaRecorder(row.filename+subject_id,"audio")
            .record()
        ,
        newTimer(1600)
            .start()
            .wait()
        ,
        getText("stimulus")
            .css({"color":"red"})
            .refresh()
        ,

        newTimer(1200)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        getMediaRecorder(row.filename+subject_id)
            .stop()

        ,
        newText("スペースキーを押して次に進んでください。")
            .css({"position":"absolute", "top":"35%"})
            .print()
        ,
        newKey(" ")
            .wait()
        )
        .log("subject_id", subject_id)
        .log("context_id", row.context_id)
        .log("case", row.case)
        .log("limit", row.limit)
        .setOption("hideProgressBar", true)
    )

//////
newTrial("break" ,
    newText("以上で実験の前半が終了しました。続いて後半の説明に入りますが、後半に進む前に短い休憩を取って頂いても構いません。<br><br>")
        .print()
    ,
    newButton("後半を始める").print().wait()
    ).setOption("hideProgressBar", true);


////
newTrial("introduction_short",
    newHtml("short_1.html")
        .print()
    ,
    newButton("練習を始める")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);



Template(
    GetTable("practice.csv")
        .filter( row => row.limit == "short")
    , row =>
    newTrial("practice_short",
        newText("cross","+")
            .css({"font-size":"40","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(800)
            .start()
            .wait()
        ,
        getText("cross")
            .remove()
        ,
        newText("stimulus", row.context)
            .css({"font-size":"40", "color":"red","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(1200)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        newText("スペースキーを押して次に進んでください。")
            .css({"position":"absolute", "top":"35%"})
            .print()
        ,
        newKey(" ")
            .wait()
    )
    .setOption("hideProgressBar", true)
)


newTrial( "practice_short_exit",
    newText("以上で練習は終わりです。スペースキーを押すと実験の後半が始まりますので、準備ができたら始めてください。<br><br>")
        .print()
    ,
    newKey(" ")
        .wait()
    ).setOption("hideProgressBar", true);

//body of the short trials
Template(
    GetTable("myTable.csv")
        .filter( row => row.limit == "short")
    , row =>
    newTrial("exp_short",
        newText("cross","+")
            .css({"font-size":"40","position":"absolute", "top":"40%"})
            .print()
        ,
        newTimer(800)
            .start()
            .wait()
        ,
        getText("cross")
            .remove()
        ,
        newText("stimulus", row.context)
            .css({"font-size":"40", "color":"red","position":"absolute", "top":"40%"})
            .print()
        ,
        newMediaRecorder(row.filename+subject_id,"audio")
            .record()
        ,
        newTimer(1200)
            .start()
            .wait()
        ,
        getText("stimulus")
            .remove()
        ,
        newTimer(2000)
            .start()
            .wait()
        ,
        getMediaRecorder(row.filename+subject_id)
            .stop()
        ,
        newText("スペースキーを押して次に進んでください。")
            .css({"position":"absolute", "top":"35%"})
            .print()
        ,
        newKey(" ")
            .wait()
        )
        .log("subject_id", subject_id)
        .log("context_id", row.context_id)
        .log("case", row.case)
        .log("limit", row.limit)
        .setOption("hideProgressBar", true)
    )




//////


newTrial("exit_form1",
    newFunction( ()=>$("body").removeClass('standout') ).call(),
    newHtml("exit", "exit.html")
        .print()
        .log("worker_id","identifier"),
    newButton("データを送信し、実験コードを確認する")
        .print()
        .wait(getHtml("exit").test.complete()
            .failure( getHtml("exit").warn() ))

).setOption("hideProgressBar", true);

SendResults("send_results");

newTrial("exit",
    newHtml("exit2","exit2.html")
        .print()
    ,
    newTimer(1)
        .wait()
).setOption("hideProgressBar", true);
