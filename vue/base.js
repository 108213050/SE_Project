// 宣告一個function
// js裡面，function是一個物件
// 因此裡面會有很多屬性、function(function中的function)
function baseOBJ() {
	var baseApp;
    // 定義
    // disabled: 使用者不能改
    //  v-for='rec in litOpts':litOpts裡面的元件用rec代表
    // 用變數產生選項<option v-for='rec in litOpts' :value='rec.v'>{{rec.o}}</option>
	//模板: 
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
	// id讀哪個(跟後臺查詢的pimary key)，div放到哪裡(放到哪個顯示元件)
	// this: 宣告對於這個物件的屬性、function，
	// 讓物件可以去取用變成一個public function
	this.loadRecord=function (id,div) {
		// let 宣告一個區塊層級的變數，有效的層級只在這個block(function)裡面
		// 取用顯示的網頁元件id
		let elmnt = document.getElementById(div);
		/*search for elements with a certain atrribute:*/
		// 檢查顯示元件是否存在
		if (elmnt) {
            // 把剛剛的模板塞進顯示元件裡頭
			elmnt.innerHTML = template;
			// 取得資料
			// getData: 處理SQL語法，負責處理拿到資料庫的資料
            let url="getData.php";
			// 要求拿到資料，需要傳id(參數)告知要查哪一筆資料
			fetch(url+"?id=" + id.toString())
			// fetch到的資料包成json
			// resp.json(): Promise 物件
			// .json轉成我需要的Promise物件格式
            .then(function(resp){return resp.json();})
			// 得到json後
            .then(function(json) {
					//console.log(json.group_no);
					//return;
					// 把json資料當成之後vue app定義的物件裡面
					baseApp=Vue.createApp( {
						// 讀到的資料
                        data() {
							return {
                                // dat:json資料包進來
								dat: json,
								// xid: primary key id
								xid: id,
								litOpts: [{v:1,o:'a'},{v:2,o:'b'},{v:3,o:'c'}]
							}
						},
						// 方法段
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
						// template:``
					});
					baseApp.mount("#"+div);
				})
		} //end if
	} //end loadrecord
} //end of baseObj function
// var baseObj=new baseOBJ();
// baseObj.loadRecord(1,'main')