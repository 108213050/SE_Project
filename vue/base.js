function baseOBJ() {
	var baseApp;
    // 定義
    // disabled: 使用者不能改
    //  v-for='rec in litOpts':litOpts裡面的元件用rec代表
    // 用變數產生選項<option v-for='rec in litOpts' :value='rec.v'>{{rec.o}}</option>
	const template=`
<form id='baseForm'>
編號<input type='text' v-model='dat.id' disabled ><br>
姓名<input type='text' v-model='dat.name'  /><br>
性別<select v-model='dat.sex'  ><option value='男'>男</option><option value='女'>女</option></select>
<br>
類別<select v-model='dat.type'  ><option v-for='rec in litOpts' :value='rec.v'>{{rec.o}}</option></select>
<br>
<hr style='clear:both;'/>
<input type='button' v-on:click='submitit()' value='Save'>
<br/>
`;
	// id讀哪個，div放到哪裡
	this.loadRecord=function (id,div) {
		let elmnt = document.getElementById(div);
		/*search for elements with a certain atrribute:*/
		if (elmnt) {
            // 把剛剛的樣板塞進顯示元件裡頭
			elmnt.innerHTML = template;
			// 取得資料
            let url="getData.php";
			fetch(url+"?id=" + id.toString())
			// 包成json
            .then(function(resp){return resp.json();})
			// 得到json後
            .then(function(json) {
					//console.log(json.group_no);
					//return;
					baseApp=Vue.createApp( {
						// 讀到的資料
                        data() {
							return {
                                // 獨到json資料包進來
								dat: json,
								xid: id,
								litOpts: [{v:1,o:'a'},{v:2,o:'b'},{v:3,o:'c'}]
							}
						},
						methods: {
                            
							submitit() {									
								// 避免重複送出
                                // 存檔用的
                                this.isSubmitted = true;
								let mydat = new FormData();
								//console.log(this.dat);
                                // dat物件變成json字串
								mydat.append( "dat", JSON.stringify(this.dat) );
								// 把它放到i這個欄位下
                                mydat.append( "i", this.xid);
								//console.log(mydat)
								let url="saveData.php";
								// 送給server post
                                fetch(url,{
									method: 'POST', 
									body: mydat									
								})
                                // 傳回值回到這個callback function，回傳的文字放到console.log裡
								.then(function(res){return res.text(); })
								.then(function(data){ 
									console.log(data)
								})
							}
						}
					});
					baseApp.mount("#"+div);
				})
		} //end if
	} //end loadrecord
} //end of baseObj function
var baseObj=new baseOBJ();
baseObj.loadRecord(1,'main')