 
ui={
  menu:function(path){
	  html = `
	  <li><a><i class="fa fa-home"></i> wzskyline <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="${path}/wzskyline/index.html">wzskyline</a></li>
                      <li><a href="${path}/wzskyline/nodejs.html">nodejs</a></li>
                      <li><a href="${path}/wzskyline/git.html">git</a></li>
                      <li><a href="${path}/wzskyline/dos.html">dos</a></li>
                      <li><a href="${path}/wzskyline/linux.html">linux</a></li>
                      <li><a href="${path}/wzskyline/tree.html">tree</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-edit"></i> py <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                    <li><a href="${path}/py/index.html">py</a></li>
                    <li><a href="${path}/py/py.html">nodejs</a></li>
                    </ul>
                  </li>
	  `;
	  $("#wzskyline").html(html)
  },
  head:function(){
	   html = `
	   
	  `;
	  $("#pageHeader").html(html)
	   
  },
} 
 