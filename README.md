# peopleselect
响应式人员组件
#模态窗口
```
基于foundation5的支持响应式的人员选择插件.组合了模态窗口，一个页面可以多个配置;本插件提供两个参考；
```
#####参考demo地址：[http://192.168.14.97:8080/acc/plugin/2_peoSelect/index.html](http://192.168.14.97:8080/acc/plugin/2_peoSelect/index.html)
##样例
####1、使用步骤
####（1）导入样式文件
```
<link data-th-href="|${tempPath}style/peopleselect.less|" href="style/peopleselect.less" rel="stylesheet" type="text/less" />
```
####（2）导入JS文件,people.js为接口插件
```
<script data-th-src="|${tempPath}javascript/jquery-2.1.3.js|" src="javascript/jquery-2.1.3.js" type="text/javascript" charset="utf8"></script> 

<script data-th-src="|${tempPath}javascript/peopleselect.js|" src="javascript/peopleselect.js" type="text/javascript" charset="utf8"></script> 

<script data-th-src="|${tempPath}javascript/people.js|" src="javascript/people.js" type="text/javascript" charset="utf8"></script>
```
####（3）页面使用代码
```
<div class="pop-wraper">
    <div class="search"><a href="#" class="Click-block" data-reveal-id="reveal1"></a>
        <div class="search-class part-peo_selected clearfix">
          <ul id="peopleSelect"></ul>
          <div class="input-label" style="width: 848px;">
            <input type="text" id="search1" autocomplete="off">
          </div>
        </div>
        <div class="suggestion">
          <ul class="clearfix"></ul>
        </div>
      </div>
    <!--弹出框-->
    <div id="reveal1" class="reveal-modal tiny really openModal pop-people" data-reveal="" aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
    <h3>人员选择1</h3>
    <div class="modal_wrap">
      <div class="serc">
        <input type="text" id="search3" class="searchinput" autocomplete="off" placeholder="搜索用户">
        <div class="suggestion2">
          <ul class="clearfix">
            <li class="rd_1 curr"><a><i>添加</i><small>×</small><img src="images/2.png" alt=""><span>张发</span></a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="large-7 large-push-5 columns">
            <div class="infs">
                <span class="look-more hide-for-large right" title="展开">展开<i class="more-img"></i></span><span class="clear-all clear-all-btn right padding-r10" href="">全部清空</span><span class="font-gray">已邀请人员</span>
            </div>
            <div class="right-list"> 
                <ul class="clearfix"></ul>
             </div>
        </div>
        <div class="large-5 large-pull-7 columns">
            <div class="infs1">
                <b class="add-all add-all-btn right hide">全部添加</b><span class="font-gray">按部门筛选</span>
             </div>
            <div class="peo-select" id="pid-2">
                <ul style="zoom:1;" class="grid-ul">
                  <li class="li-css grid-0">
                    <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>一级配置</div>
                    <ul class="grid-1 rd endCss">
                      <li class="rd_1"><a href="javascript:;" selectid="1"><i>添加</i><small>×</small><img src="images/1.png" alt=""><span>张发</span></a></li>
                    </ul>
                  </li>
                  <li class="li-css grid-0">
                    <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>二级配置</div>
                    <ul class="grid-1">
                      <li>
                        <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发中心</div>
                        <ul class="grid-2 endCss">
                          <li class="rd_4"><a href="javascript:;" selectid="1"><i>添加</i><small>×</small><img src="images/1.png" alt=""><span>张五</span></a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li class="li-css grid-0">
                    <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>三级配置</div>
                    <ul class="grid-1">
                      <li>
                        <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发中心</div>
                        <ul class="grid-2 ">
                          <li>
                            <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发部</div>
                            <ul class="grid-3 endCss">
                              <li class="rd_7"><a href="javascript:;" selectid="1"><i>添加</i><small>×</small><img src="images/1.png" alt=""><span>张8</span></a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li class="li-css grid-0">
                    <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>四级配置</div>
                    <ul class="grid-1">
                      <li>
                        <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发中心</div>
                        <ul class="grid-2">
                          <li>
                            <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发部</div>
                            <ul class="grid-3">
                              <li>
                                <div class="deploy"><a class="addCurall right">添加所有成员</a><i class="turn-right"></i>研发小组</div>
                                <ul class="grid-4 endCss">
                                  <li class="rd_10"><a href="javascript:;" selectid="1"><i>添加</i><small>×</small><img src="images/1.png" alt=""><span>张11</span></a></li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
        </div>
      </div>
    </div>
  <div class="row confirm">
    <div class="small-12 columns"> <a class="right button margin-r  sure" orgid="peopleSelect">提交</a> <a class="close-reveal-modal right button secondary margin-r" aria-label="Close">取消</a> </div>
  </div>
  <a class="close-reveal-modal" aria-label="Close">×</a> </div>
</div>
```
####（4）方法和API
```
直接使用JS样式文件和代码就可以，接口是people.js
```
#参数说明：
```
*无，具体实现详情peopleselect.JS里面有写
```
#更新日志
```
无
```
