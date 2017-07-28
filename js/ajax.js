function ajax(url){
	var projectId=localStorage.getItem('projectId');
	
	var url=url+'?projectId='+projectId;
//	alert(url);
	//上拉加载下拉刷新
	mui.init({
	　　pullRefresh: {
	　　container: '#pullrefresh',
	　　up: {
	　　　　contentrefresh: '正在加载...',
	　　　　callback: pullupRefresh
	　　　　}
	　　}
	});
  //加载更多
 var pageSize = 10;//每页显示条数
 var counter = 1;//计数器
 var pageStart = 0;//开始数据条数
 var Flag=true;
 data();
 function data() {
  //业务
  var result = "";
  $.ajax({
   type: 'post',
   url: url,
   async: false,
   dataType: "json",
   data: {
   	    pageNumber: counter,
        pageSize: pageSize
   },
   success: function (data) {  
   	var dat=data.data;
   Flag=dat.pageData==null||dat.pageData==undefined||dat.pageData=='';
//判断是否有返回值 当没有返回值的时候就为空，则代表没有更多数据了
//  console.log(Flag);
    if(Flag==false){
     counter++;
    }
    var table = document.body.querySelector('.mui-table-view');	
    for(var i=0;i<dat.pageData.length;i++){ 
    var urlT="http://192.168.0.168";
    if(url==urlT+"/webAppOperationRecordShow?projectId="+projectId){
            if(dat.pageData[i].state==2){
			   dat.pageData[i].state='已还车';

			}else{
			   dat.pageData[i].state='借车中';
			}
			
			
           var li = document.createElement('li');              
		   li.className = 'mui-table-view-cell mui-media mui-collapse';
		   li.innerHTML = 
		   '<a href="#"> ' + (dat.pageData[i].userAccount) +
		   '<span class="mui-pull-right"><b>'+(dat.pageData[i].state)+'</b></span>'+	   
		   '</a>'+
		   '<div class="mui-collapse-content">借车时间：'+(dat.pageData[i].borrowTimeStr)+
		   '</div>'+
		   '<div class="mui-collapse-content">还车时间：'+(dat.pageData[i].returnTimeStr)+
		   '</div>'+
		   '<P style="display:none">'+(dat.pageData[i].id)+'元</P>'+
		   '<div class="mui-collapse-content">费用：'+(dat.pageData[i].cost)+'元</div>';
		   //下拉刷新，新纪录插到最前面；
		   table.insertBefore(li, table.lastChild);    		              	
           }else if(url==urlT+"/webAppUserCardShow?projectId="+projectId){
             if(dat.pageData[i].cardState==0){
			 		  dat.pageData[i].cardState='可借车';
			 	}else if(dat.pageData[i].cardState==1){
			     dat.pageData[i].cardState='借车中';
			 	}else{
			 		dat.pageData[i].cardState='异常';
			 	}
			
            var li = document.createElement('li');              
		    li.className = 'mui-table-view-cell mui-collapse';
		    li.innerHTML = 
		    '<p>'+
		    '<img src="images/left.png" alt="" class="mui-pull-left"/>'+
		    (dat.pageData[i].realName)+
		    '<span class="mui-pull-right">'+(dat.pageData[i].cardState)+'</span>'+
		    '</p>'+
		    '<p>卡号：'+(data.data.pageData[i].cardNo)+'</p>'+
		    '<p>押金：'+(dat.pageData[i].cardDeposit)+'</p>'+
		    '<p>余额：'+(dat.pageData[i].cardBalance)+'</p>';
		    //下拉刷新，新纪录插到最前面；
		    table.insertBefore(li, table.lastChild);   		
       }
                	
				 
                }
   }
  }
 );
}
/**
 * 上拉加载具体业务实现
 */

function pullupRefresh() {

 setTimeout(function () {
  mui('#pullrefresh').pullRefresh().endPullupToRefresh((Flag)); //参数为true代表没有更多数据了。
  data();
 }, 1500);
 
}
}
