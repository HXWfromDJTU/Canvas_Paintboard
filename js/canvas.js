var canvas = document.getElementById('canvas');
var con = canvas.getContext('2d');
//��ȡ������ť
var save = document.getElementById("saveImage");
var clear = document.getElementById("clearBoard");

function saveImg() {
	var imgData = canvas.toDataURL();
	var imgDataInput = document.getElementById("download_img");
	var imgForm = document.getElementById("imgForm");
	imgDataInput.value = imgData.substring(22);
	imgForm.submit();
}

function clearBoard() {
	con.clearRect(0, 0, 880, 400);
}
/* ��ȡ���߰�ť */
var brush = document.getElementById('means_brush');
var eraser = document.getElementById('means_eraser');
var magnifier = document.getElementById('means_magnifier');
var straw = document.getElementById('means_straw');
var paint = document.getElementById('means_paint');
var textTool = document.getElementById('means_text');
var arc = document.getElementById('shape_arc');
var arcfill = document.getElementById('shape_arcfill');
var poly = document.getElementById('shape_poly');
var rect = document.getElementById('shape_rect');
var rectfill = document.getElementById('shape_rectfill');
var line = document.getElementById('shape_line');
var actions = [brush, eraser, magnifier, straw, paint, textTool, arc, arcfill, poly, rect, rectfill, line];
//״̬���ú���
function setStatus(Arr, num, type) {
	for(var i = 0; i < Arr.length; i++) {
		if(i == num)
			if(type == 1) {
				Arr[i].style.background = "yellow";
			} else {
				Arr[i].style.border = "1px solid #fff";
			}
		else
		if(type == 1) {
			Arr[i].style.background = "#ccc";
		} else {
			Arr[i].style.border = "1px solid #000";
		}
	}
}
var flag = 0; //����һ����־���ж�����Ƿ�����
//�򵥵Ļ��ʹ���
function drawBrush(num) {
	setStatus(actions, num, 1);

	canvas.onmousedown = function(evt) {
		//����Ҫ��ȡ�����canvas��ǩ�ڲ�������
		evt = window.event || evt; //�������¼������W3C��IE�Ĳ�ͬ��				
		//����ڴ��ڵ���꣨a��b�� ��ȥ canvas��ǩ����ڴ��ڵ���꣨c��d��
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		//alert(startX+'-------'+startY);
		flag = 1;

		con.beginPath();
		con.moveTo(startX, startY);
	}
	canvas.onmousemove = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		if(flag) {
			con.lineTo(endX, endY);
			con.stroke();
		}
	}
	canvas.onmouseup = function() {
		flag = 0;
	}

	canvas.onmouseout = function() {
		flag = 0;
	}
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/brush - icon.png'),auto";
	}
}
//��Ƥ������

function drawEraser(num) {
	setStatus(actions, num, 1);
	var oriWidth = con.lineWidth; //���������������ڱ���ʹ����Ƥ��ǰ�Ļ��ʲ���
	var oriColor = con.strokeStyle;
	canvas.onmousedown = function(evt) {
		flag = 1;
		evt = window.event || evt;
		var clearX = evt.pageX - this.offsetLeft;
		var clearY = evt.pageY - this.offsetTop;
		con.strokeStyle = "white";
		con.lineWidth = 30;
		con.beginPath();
		con.moveTo(clearX, clearY);
	}
	canvas.onmousemove = function(evt) {
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		if(flag) {
			con.lineTo(endX, endY);
			con.stroke();
		}
	}
	canvas.onmouseup = function() {
		flag = 0;
		con.lineWidth = oriWidth;
		con.strokeStyle = oriColor;
	}
	canvas.onmouseout = function() {
		flag = 0;
	}
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/eraser-icon.png'),auto";
	}

}
//�Ŵ󾵹���
function drawMagnifier(num) {
	setStatus(actions, num, 1);
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/Magnifier-icon.png'),auto";
	}
	var scale = window.prompt("请输入要放大的百分比（%）", "100");
	var scaleW = 880 * scale / 100;
	var scaleH = 400 * scale / 100;
	//此处因为是用标签内部的属性直接定义的宽和高，所以变化的时候直接修改标签里面的属性
	canvas.width = parseInt(scaleW);
	canvas.height = parseInt(scaleH);
}
//��ɫ��ȡ������
function drawStraw(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		var strawX = evt.pageX - this.offsetLeft;
		var strawY = evt.pageY - this.offsetTop;
		var strawObj = con.getImageData(strawX, strawY, 1, 1);
		var strawColor = 'rgb(' + strawObj.data[0] + ',' + strawObj.data[1] + ',' + strawObj.data[2] + ')';
		con.strokeStyle = strawColor;

	}
	canvas.onmouseout = null;
	canvas.onmousemove = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/straw-icon.png'),auto";
	}
	canvas.onmouseup = null;
}
//����Ͱ����
function drawPaint(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function() {
		con.fillRect(0, 0, 880, 400);
	}
	canvas.onmouseup = null;
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/Paint-icon.png'),auto";
	}
}
//���ֹ���
function drawText(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//��ȡ�����ʱ��λ��
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop;
		//alert(textX+'------'+textY);
		//��ȡ�û��������Ϣ
		//window.prompt(�Ի�����ʾ,Ĭ��ֵ);
		var userVal = window.prompt('����������������', '');
		//alert(userVal);
		//���û����������д�������ж�Ӧ�������ϡ�
		if(userVal != null) {
			con.fillText(userVal, textX, textY);
		}

	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "url('images/text-icon.png'),auto";
	}
}

//������Բ��״
var coreX = 0;
var coreY = 0;

function drawArc(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		coreX = evt.pageX - this.offsetLeft;
		coreY = evt.pageY - this.offsetTop;

	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - coreX;
		var b = endY - coreY;
		var radius = Math.sqrt(a * a + b * b);
		con.beginPath();
		con.arc(coreX, coreY, radius, 0, 360, false);
		con.closePath();
		con.stroke();

	}
	canvas.onmouseout = null;
	canvas.onmousemove = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}
}
//��ʵ��Բ��
function drawArcfill(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		coreX = evt.pageX - this.offsetLeft;
		coreY = evt.pageY - this.offsetTop;

	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - coreX;
		var b = endY - coreY;
		var radius = Math.sqrt(a * a + b * b);
		con.beginPath();
		con.arc(coreX, coreY, radius, 0, 360, false);
		con.fill();
		con.closePath();

	}
	canvas.onmouseout = null;
	canvas.onmousemove = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}
}
//�������
var polyX = 0;
var polyY = 0;

function drawPoly(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		polyX = evt.pageX - this.offsetLeft;
		POLyY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		con.beginPath();
		//�������ƶ������½ǵĶ���
		con.moveTo(endX, endY);
		//�������½ǵĶ������
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		con.lineTo(lbX, lbY);
		//���õ������������
		var tmpC = 2 * (endX - polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
		//���������涥�����
		//endY-tmpB �����Y��� polyX�Ƕ����X���
		//��������
		con.lineTo(polyX, endY - tmpB);
		//���·��->������
		con.closePath();
		con.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}
}
//���λ�ͼ
var rectX1 = 0;
var rectY1 = 0;

function drawRect(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		rectX1 = evt.pageX - this.offsetLeft;
		rectY1 = evt.pageY - this.offsetTop;
	}
	canvas.mouseemove = null;
	canvas.mouseout = null;
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var rectX2 = evt.pageX - this.offsetLeft;
		var rectY2 = evt.pageY - this.offsetTop;
		//������
		var rectWidth = rectX2 - rectX1;
		var rectHeight = rectY2 - rectY1;
		con.strokeRect(rectX1, rectY1, rectWidth, rectHeight);
	}
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}

}
//��ʵ�ľ���
function drawRectfill(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		rectX1 = evt.pageX - this.offsetLeft;
		rectY1 = evt.pageY - this.offsetTop;
	}
	canvas.mouseemove = null;
	canvas.mouseout = null;
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var rectX2 = evt.pageX - this.offsetLeft;
		var rectY2 = evt.pageY - this.offsetTop;
		//������
		var rectWidth = rectX2 - rectX1;
		var rectHeight = rectY2 - rectY1;
		con.fillRect(rectX1, rectY1, rectWidth, rectHeight);
	}
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}

}
//��ֱ�ߵĹ���
function drawLine(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		con.beginPath();
		con.moveTo(startX, startY);

	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		con.lineTo(endX, endY);
		con.closePath();
		con.stroke();
	}
	canvas.onmouseover = function() {
		document.getElementById("canvas").style.cursor = "crosshair";
	}
}

//��ȡ�߿���ť
var line_1 = document.getElementById('lineWidth_1');
var line_3 = document.getElementById('lineWidth_3');
var line_5 = document.getElementById('lineWidth_5');
var line_8 = document.getElementById('lineWidth_8');
//�������߿������뵽һ��������
var lineWidth = [line_1, line_3, line_5, line_8];

function setWidth(num) {
	setStatus(lineWidth, num, 1);
	switch(num) {
		case 0:
			con.lineWidth = 1;
			con.font = "10px ����";
			break;
		case 1:
			con.lineWidth = 3;
			con.font = "20px ����";
			break;
		case 2:
			con.lineWidth = 5;
			con.font = "40px ����";
			break;
		case 3:
			con.lineWidth = 8;
			con.font = "80px ����";
			break;
		default:
			con.lineWidth = 1;
	}
}

//��ȡ��ɫ�����
var color_red = document.getElementById('red');
var color_black = document.getElementById('black');
var color_blue = document.getElementById('blue');
var color_yellow = document.getElementById('yellow');
var color_orange = document.getElementById('orange');
var color_green = document.getElementById('green');
var color_gray = document.getElementById('gray');
var color_purple = document.getElementById('purple');
var color_white = document.getElementById('white');
var color_pink = document.getElementById('pink');

var colorArr = [color_red, color_black, color_blue, color_yellow, color_orange, color_green, color_gray, color_purple, color_white, color_pink];

function setColor(obj, num) {
	setStatus(colorArr, num, 2);
	con.strokeStyle = obj.id; //����ǩ�����id��Ϊ�ʴ���ɫ��
	con.fillStyle = obj.id;
}

//初始化默认ֵ
drawBrush(0);
setWidth(0);
setColor(color_black, 1);