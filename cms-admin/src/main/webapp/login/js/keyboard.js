var ufidaKey=new Object();
ufidaKey.FuncKey=new Object();
ufidaKey.DownKey=-1;
ufidaKey.LastKey=-1;
ufidaKey.LastChar='';
ufidaKey.FuncKey.BackSpace=8;
ufidaKey.FuncKey.Tab=9;
ufidaKey.FuncKey.Clear=12;
ufidaKey.FuncKey.Enter=13;
ufidaKey.FuncKey.Shift=16;
ufidaKey.FuncKey.Ctrl=17;
ufidaKey.FuncKey.Alt=18;
ufidaKey.FuncKey.CapeLock=20;
ufidaKey.FuncKey.Esc=27;
ufidaKey.FuncKey.Spacebar=32;
ufidaKey.FuncKey.PageUp=33;
ufidaKey.FuncKey.PageDown=34;
ufidaKey.FuncKey.End=35;
ufidaKey.FuncKey.Home=36;
ufidaKey.FuncKey.ArrowLeft=37;
ufidaKey.FuncKey.ArrowUp=38;
ufidaKey.FuncKey.ArrowRight=39;
ufidaKey.FuncKey.ArrowDown=40;
ufidaKey.FuncKey.Insert=45;
ufidaKey.FuncKey.Delete=46;
ufidaKey.FuncKey.F1=112;
ufidaKey.FuncKey.F2=113;
ufidaKey.FuncKey.F3=114;
ufidaKey.FuncKey.F4=115;
ufidaKey.FuncKey.F6=117;
ufidaKey.FuncKey.F7=118;
ufidaKey.FuncKey.F8=119;
ufidaKey.FuncKey.F9=120;
ufidaKey.FuncKey.F10=121;
ufidaKey.FuncKey.F11=122;
ufidaKey.FuncKey.F12=123;
ufidaKey.FuncKey.Enter2=108;
ufidaKey.FuncKey.NumLock=144;
function ufidaKeyPress(e){
	if(!e){e=window.event;};
	var currKey=e.keyCode||e.which||e.charCode;
	ufidaKey.LastChar=String.fromCharCode(currKey);
}
function ufidaKeyDown(e){
	if(!e){e=window.event;};
	var currKey=e.keyCode||e.which||e.charCode;
	ufidaKey.DownKey=currKey;
}
function ufidaKeyUp(e){
	if(!e){e=window.event;};
	//var currKey=e.keyCode||e.which||e.charCode;
	ufidaKey.DownKey=-1;
}
//document.onkeypress=ufidaKeyPress;
//document.onkeydown =ufidaKeyDown;
//document.onkeyup =ufidaKeyUp;
