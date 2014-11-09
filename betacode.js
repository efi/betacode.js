/**
 * betacode.js (https://github.com/exchange-projekt/betacode.js)
 * A Javascript converter from and to pre-unicode Greek notation
 * © 2014, Peggy Lucke & Thomas Efer
 */

//-----------------------------Wrapper-------------------------------------------------------
(function (root) {
	"use strict"; //Strict mode execution
conv.prototype.version="0.9"


//-----------------------------Fallback if unorm is not present-------------------------------------------------------
function unorm_nfd(s){ return (typeof(unorm) != "undefined") ? unorm.nfd(s) : s; }
function unorm_nfc(s){ return (typeof(unorm) != "undefined") ? unorm.nfc(s) : s; }

//-----------------------------Testmethod to unicode codepoints and back-------------------------------------------------------
function deuni(input){
	output= unescape(input.replace(/\]/g,"").replace(/\[U\+/g,"%u"));
 return output;
}

function uni(input){
	var output="";
	 for (i in input.split("")) {
		   output+="[U+"+("0000"+input.charCodeAt(i).toString(16)).substr(-4)+"]";
	 }
	 return output;
}
//------------------------------End-Testmethod---------------------------------------------------------------------------

//----------------------------preprocess----------------------------------------------------------------------------
conv.prototype.preprocess=function(input){
	this.input=input;
	var akut=this.akut;
	var gravis=this.gravis;
	var splenis=this.splenis;
	var spasper=this.spasper;
	var input = unorm_nfd(input);
	
	var akutpattern = /[\u00B4\u02B9\u02CA\u0374\u0384\u1FFD\u0301]/ig;
	var gravispattern=/[\u1FEF\u0060\uFF40\u02F4\u055D\u2035\u0300]/ig;
	var splenispattern=/[\u1fbd\u2019\u0313\u02bc\u1fbf]/ig;
	var spasperpattern=/[\u1FFE\u0314\u02bb\u02bd]/ig;
	var output=input.replace( akutpattern, akut);
	output=output.replace(splenispattern,splenis);
	output=output.replace(gravispattern,gravis);
	output=output.replace(spasperpattern,spasper);
	output=unorm_nfd(output);
	return output;
};
//------------------------------------END-preprocess-------------------------------------------------------------------
//--------------------------------------postprocess-------------------------------------------------------------------
function postprocess(str){
	  output= unorm_nfc(str);
	  return output;
}
//------------------------------------END-postprocess-----------------------------------------------------------------
//------------------------------------main-function------------------------------------------------------------------
function conv(){}
root.Beta=root.β=conv; //export conv into global namespace

conv.prototype.input="";
conv.prototype.akut="\u0301";
conv.prototype.akut2="\u1FFD";
conv.prototype.gravis="\u0300";
conv.prototype.splenis="\u0313";
conv.prototype.splenis2="\u1fbd";

conv.prototype.spasper="\u0314";
conv.prototype.spasper2="\u1FFE";

conv.prototype.iotasubscriptum="\u0345";
conv.prototype.zirkumflex="\u0342";
conv.prototype.trema="\u0308";
conv.prototype.macron="\u0304";
conv.prototype.breve="\u0306";
conv.prototype.tagFault=false;
conv.prototype.seeFault=true;

conv.prototype.seeDiacritics=true;

conv.prototype.betabreve="\'";
conv.prototype.betamacron="&";

//--------------------------------------END-main-function-------------------------------------------------------------
//--------------------------------------betacodeWithoutDiacritics------------------------------------------------------------
conv.prototype.betacodeWithoutDiacritics=function(input){
	var greek=new conv();
	greek.seeDiacritics=false;
	greek.tagFault=this.tagFault;
	greek.seeFault=this.seeFault;
	greek.betabreve=this.betabreve;
	greek.betamacron=this.betamacron;
	greek.akut=this.akut;
	greek.akut2=this.akut2;
	greek.gravis=this.gravis;
	greek.splenis=this.splenis;
	greek.splenis2=this.splenis2;
	greek.spasper=this.spasper;
	greek.spasper2=this.spasper2;
	greek.iotasubscriptum=this.iotasubscriptum;
	greek.zirkumflex=this.zirkumflex;
	greek.trema=this.trema;
	greek.macron=this.macron;
	greek.breve=this.breve;
	
	var output=greek.betacodeToGreek(input)[0];
	return greek.greekToBetacode(output);
};
//--------------------------------------END-betacodeWithoutDiacritics------------------------------------------------------------
//--------------------------------------greekWithoutDiacritics------------------------------------------------------------
conv.prototype.greekWithoutDiacritics=function(input){
	var beta=new conv();
	beta.seeDiacritics=false;
	beta.tagFault=this.tagFault;
	beta.seeFault=this.seeFault;
	beta.betabreve=this.betabreve;
	beta.betamacron=this.betamacron;
	beta.akut=this.akut;
	beta.akut2=this.akut2;
	beta.gravis=this.gravis;
	beta.splenis=this.splenis;
	beta.splenis2=this.splenis2;
	beta.spasper=this.spasper;
	beta.spasper2=this.spasper2;
	beta.iotasubscriptum=this.iotasubscriptum;
	beta.zirkumflex=this.zirkumflex;
	beta.trema=this.trema;
	beta.macron=this.macron;
	beta.breve=this.breve;
	
	var output=beta.greekToBetacode(input)[0];
	return beta.betacodeToGreek(output);
};
//--------------------------------------END-greekWithoutDiacritics------------------------------------------------------------
//--------------------------------------Automatic converter------------------------------------------------------------
conv.prototype.convert=function(input){
	var test=new conv();
	test.seeDiacritics=this.seeDiacritics;
	test.tagFault=this.tagFault;
	test.seeFault=this.seeFault;
	test.betabreve=this.betabreve;
	test.betamacron=this.betamacron;
	test.akut=this.akut;
	test.akut2=this.akut2;
	test.gravis=this.gravis;
	test.splenis=this.splenis;
	test.splenis2=this.splenis2;
	test.spasper=this.spasper;
	test.spasper2=this.spasper2;
	test.iotasubscriptum=this.iotasubscriptum;
	test.zirkumflex=this.zirkumflex;
	test.trema=this.trema;
	test.macron=this.macron;
	test.beve=this.breve;

	input+=" ";
	var output= new Array();
	if(input.length>20){
		if(test.betacodeToGreek(input.slice(0,19))[1]<test.greekToBetacode(input.slice(0,19))[1]){
			if(test.betacodeToGreek(input.slice(0,19))[1]<test.spionicToGreek(input.slice(0,19))[1]){output=test.betacodeToGreek(input);}
			else{output=test.spionicToGreek(input);}}
		else{output=test.greekToBetacode(input);}}
	else{
		if(test.betacodeToGreek(input)[1]<test.greekToBetacode(input)[1]){
			if(test.betacodeToGreek(input.slice(0,19))[1]<test.spionicToGreek(input.slice(0,19))[1]){output=test.betacodeToGreek(input);}
			else{output=test.spionicToGreek(input);}}
		else{output=test.greekToBetacode(input);}}
	output[0]=output[0].substr(0,output[0].length-1);
	return output;
};
//--------------------------------------END-automatic-converter-------------------------------------------------------------
//--------------------------------------handling diacrits in betacode/spionic to greek---------------------------------------
function diacrit(booldia, todia, seeDiacritics){
	var memory=booldia[0];
	//nobreve=this.
	if (booldia[1]){memory=memory.toUpperCase();booldia[1]=false;}//capital
	if(seeDiacritics){
		if (booldia[2]){memory+=todia[0];booldia[2]=false;}//trema
		if (booldia[3]){if(/[αερυηιοωτλθπ]/i.test(memory)){memory+=todia[1];}else{memory+=todia[2];}booldia[3]=false;}//spasper
		if (booldia[4]){if(/[αερυηιοωτλθπ]/i.test(memory)){memory+=todia[3];}else{memory+=todia[4];}booldia[4]=false;}//splenis
		if (booldia[5]){if(/[αερυηιοωτλθπ]/i.test(memory)){memory+=todia[5];}else{memory+=todia[6];}booldia[5]=false;}//akut
		if (booldia[6]){memory+=todia[7];booldia[6]=false;}//gravis
		if (booldia[7]){memory+=todia[8];booldia[7]=false;}//zirkumflex
		if (booldia[8]){memory+=todia[9];booldia[8]=false;}//macron
		if (booldia[9]){if(/[αυι]/i.test(memory)){memory+=todia[10];}else{memory+=todia[12];}booldia[9]=false;}//breve
		if (booldia[10]){memory+=todia[11];booldia[10]=false;}//iota
	}
	booldia[0]=memory;
	return booldia;
}
//-----------------------------------END handling diacrits in betacode/spionic to greek------------------------------------------------------------
//--------------------------------------betacode to greek -converter------------------------------------------------------------
conv.prototype.betacodeToGreek=function(input){
	this.input=input;
	var tagFault=this.tagFault;
	var charFault=false;
	var seeFault=this.seeFault;
	var seedia=this.seeDiacritics;
	//var test="";
	//input = preprocess(input);
	//alert(tagFault);
	var test="";
	var alpha={
		"a":"α",
		"b":"β",
		"g":"γ",
		"d":"δ",
		"e":"ε",
		"z":"ζ",
		"h":"η",
		"q":"θ",
		"i":"ι",
		"k":"κ",
		"l":"λ",
		"m":"μ",
		"n":"ν",
		"c":"ξ",
		"o":"ο",
		"p":"π",
		"r":"ρ",
		"j":"ς",
		"s":"σ",
		"t":"τ",
		"u":"υ",
		"f":"φ",
		"x":"χ",
		"y":"ψ",
		"w":"ω",
		"v":"ϝ"
	};
	var fault=0;
	var outputString="";
	var bool=new Array("",false,false,false,false,false,false,false,false,false,false);
	var charTransCapital='*';
	var charTransAkut='/';
	var charTransGravis='\\';
	var charTransSpasper='(';
	var charTransSplenis=')';
	var charTransIotasubscriptum='|';
	var charTransZirkumflex='=';
	var charTransTrema='+';
	var charTransMacron=this.betamacron;
	var charTransMacron2='_';
	var charTransBreve=this.betabreve;
	var todia=new Array(this.trema,this.spasper,this.spasper2,this.splenis,this.splenis2,this.akut,this.akut2,this.gravis,this.zirkumflex,this.macron,this.breve,this.iotasubscriptum, this.betabreve);

	for (var i=0;i<input.length;i++){
		var letter= input.charAt(i);
		//						0			1			2			3				4			5				6		7			8				9			10		11
		if(alpha[letter.toLowerCase()]){	
			  if (bool[0].length===0){
				  if(letter===letter.toLowerCase()){
					  if(letter=='s'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
						  if(/[\s,\.\-\?;:\']/.test(letter2)||letter2==charTransBreve){bool[0]='ς';charFault=false;continue;}
					  }
					  bool[0]=alpha[letter];charFault=false;
				  }else{
					  if(letter=='S'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
					  }
					  bool[0]=alpha[letter.toLowerCase()].toUpperCase();charFault=false;
				  }
			  }else{
				  bool=diacrit(bool,todia,seedia);
				  outputString=outputString+bool[0];
				  if(letter===letter.toLowerCase()){
					  if(letter=='s'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]=alpha[letter];i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
						  if(/[\s,\.\-\?\';:]/.test(letter2)){bool[0]='ς';charFault=false;continue;}
					  }
					  bool[0]=alpha[letter];charFault=false;
				  }else{
					  if(letter=='S'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
					  }
					  bool[0]=alpha[letter.toLowerCase()].toUpperCase();charFault=false;
				  }
			  }
			  charFault=false;continue;
		}
		  //case "*":
		if(letter==charTransCapital){
			  if(bool[0].length===0){
				  bool[1]=true;
			  }else{
				  bool=diacrit(bool,todia,seedia);
				  outputString=outputString+bool[0];
				  bool[1]=true;
				  bool[0]="";
			  }
			  charFault=false;continue;
		}
		if(letter==charTransAkut){bool[5]=true;charFault=false;continue;}// case "/"
		if(letter==charTransGravis){bool[6]=true;charFault=false;continue;}// case "\\"
		if(letter==charTransSpasper){bool[3]=true;charFault=false;continue;}//case charTransSpasper
		if(letter==charTransSplenis){bool[4]=true;charFault=false;continue;}// case charTransSplenis
		if(letter==charTransIotasubscriptum){bool[10]=true;charFault=false;continue;}// case "|"
		if(letter==charTransZirkumflex){bool[7]=true;charFault=false;continue;}// case "="
		if(letter==charTransTrema){bool[2]=true;charFault=false;continue;}// case "+"
		if(letter==charTransMacron|| letter==charTransMacron2){bool[8]=true;charFault=false;continue;}// case "/[&_]/"
		if(letter==charTransBreve){bool[9]=true;charFault=false;continue;}//case "'"
		if(letter=='%'){
			  if(input.charAt(i+1)=="2"){
				  if(input.charAt(i+2)=="6"){bool[8]=true;i=i+2;}
				  if(input.charAt(i+2)=="7"){bool[9]=true;i=i+2;}
			  }	  
			  charFault=false;continue;
		}
		if(letter=='#'){
			var letter2=input.charAt(i+1);
			if(letter2=='2'){
				if(input.charAt(i+2)=='2'){
					if(bool[0].length===0){outputString=outputString+"͵";i=i+2;}
					else{
						bool=diacrit(bool,todia,seedia);
						outputString=outputString+bool[0]+"͵";
						bool[0]="";
						i=i+2;
					}
					charFault=false;continue;
				}
				if(bool[0].length===0){bool[0]='ϛ';i++;charFault=false;continue;}
				else{
					bool=diacrit(bool,todia,seedia);
					outputString=outputString+bool[0];	
					bool[0]='ϛ';
					i++;
					charFault=false;continue;
				}
			}
			
			if(letter2=='3'){
				if(bool[0].length===0){bool[0]='ϟ';i++;charFault=false;continue;}
				else{
					bool=diacrit(bool,todia,seedia);
					outputString=outputString+bool[0];	
					bool[0]='ϟ';
					i++;
					charFault=false;continue;
				}
			}
			
			if(letter2=='4'){
				if(bool[0].length===0){bool[0]='ϡ';i++;charFault=false;continue;}
				else{
					bool=diacrit(bool,todia,seedia);
					outputString=outputString+bool[0];	
					bool[0]='ϡ';
					i++;
					charFault=false;continue;
				}
			}
		}
		 // default:
		bool=diacrit(bool,todia,seedia);
		outputString=outputString+bool[0];
		bool[0]="";
		if(letter==";"||letter==":"){outputString=outputString+"·";charFault=false;continue;}
		if(letter=="?"){outputString=outputString+";";charFault=false;continue;}
		if(letter=="#"){outputString=outputString+"ʹ";charFault=false;continue;}
		if(/[\s,\.\-\?;:\']/.test(letter)){outputString=outputString+letter;charFault=false;continue;}
		if(seeFault){
			if(tagFault){
				if(charFault){
					outputString=outputString.slice(0, outputString.lastIndexOf("</fault>", 0)-7);
					outputString=outputString+letter+"</fault>";
				}else{outputString=outputString+"<fault>"+letter+"</fault>";charFault=true;}
			}else{outputString=outputString+letter;}
		}
		fault++;//test=test+letter;
	}
	if(bool[0].length!==0){bool=diacrit(bool,todia,seedia);outputString=outputString+bool[0];}
	outputString= unorm_nfc(outputString);
	var output=new Array(outputString/*+"\n"+test*/,fault);
	return output;

};
//-------------------------------------END betacode to greek -converter----------------------------------------------------------
//--------------------------------------SPIonic to greek - converter----------------------------------------------------------------
conv.prototype.spionicToGreek=function(input){
	this.input=input;
	var seedia=this.seeDiacritics;
	var tagFault=this.tagFault;
	var charFault=false;
	var seeFault=this.seeFault;
	var test="";
	var alpha={
			"a":"α",
			"b":"β",
			"g":"γ",
			"d":"δ",
			"e":"ε",
			"z":"ζ",
			"h":"η",
			"q":"θ",
			"i":"ι",
			"k":"κ",
			"l":"λ",
			"m":"μ",
			"n":"ν",
			"c":"ξ",
			"o":"ο",
			"p":"π",
			"r":"ρ",
			"j":"ς",
			"s":"σ",
			"t":"τ",
			"u":"υ",
			"f":"φ",
			"x":"χ",
			"y":"ψ",
			"w":"ω",
			"v":"ϝ"
	};
	var fault=0;
	var outputString="";
	var bool=new Array("",false,false,false,false,false,false,false,false,false,false);
	var charTransAkut='/'; 				var charTransAkut2='&';
	var charTransGravis='\\';			var charTransGravis2='_';
	var charTransSpasper='(';			var charTransSpasper2='9';
	var charTransSplenis=')';			var charTransSplenis2='0';
	var charTransIotasubscriptum='|';
	var charTransZirkumflex='=';		var charTransZirkumflex2='~';var charTransZirkumflex3="?";
	var charTransTrema='+';
	//var charTransMacron='&';
	//var charTransMacron2='_';
	var charTransBreve=this.betabreve;
	var combi="1"; var combi2="!";	// )/
	var combi3="$";	var combi10="4";// (\
	var combi4="#";	var combi11="3";// (/
	var combi5="{"; var combi6="[";	// (=
	var combi7="}";	var combi8="]";	// )=
	var combi9="@";					// )\
	var todia =new Array(this.trema,this.spasper,this.spasper2,this.splenis,this.splenis2,this.akut,this.akut2,this.gravis,this.zirkumflex,this.macron,this.breve,this.iotasubscriptum, this.betabreve);

	for (var i=0;i<input.length;i++){
		var letter= input.charAt(i);
		//						0			1			2			3				4			5				6		7			8				9			10		11
		if(alpha[letter.toLowerCase()]){	
			  if (bool[0].length===0){
				  if(letter===letter.toLowerCase()){
					  if(letter=='s'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
						  if(/[\s,\.\-;:\']/.test(letter2)){bool[0]='ς';charFault=false;continue;}
					  }
					  bool[0]=alpha[letter];
				  }else{
					  if(letter=='S'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
					  }
					  bool[0]=alpha[letter.toLowerCase()].toUpperCase();
				  }
			  }else{
				  bool=diacrit(bool,todia,seedia);
				  outputString=outputString+bool[0];
				  if(letter===letter.toLowerCase()){
					  if(letter=='s'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]=alpha[letter];i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
						  if(/[\s,\.\-;:\']/.test(letter2)){bool[0]='ς';charFault=false;continue;}
					  }
					  bool[0]=alpha[letter];
				  }else{
					  if(letter=='S'){
						  var letter2=input.charAt(i+1);
						  if(letter2=='1'){bool[0]='σ';i++;charFault=false;continue;}
						  if(letter2=='2'){bool[0]='ς';i++;charFault=false;continue;}
						  if(letter2=='3'){bool[0]='ϲ';i++;charFault=false;continue;}
					  }
					  bool[0]=alpha[letter.toLowerCase()].toUpperCase();
				  }
			  }
			  charFault=false;continue;
		}
		if(letter==charTransAkut||letter==charTransAkut2){bool[5]=true;charFault=false;continue;}// case "/"
		if(letter==charTransGravis||letter==charTransGravis2){bool[6]=true;charFault=false;continue;}// case "\\"
		if(letter==charTransSpasper||letter==charTransSpasper2){bool[3]=true;charFault=false;continue;}//case charTransSpasper
		if(letter==charTransSplenis||letter==charTransSplenis2){bool[4]=true;charFault=false;continue;}// case charTransSplenis
		if(letter==charTransIotasubscriptum){bool[10]=true;charFault=false;continue;}// case "|"
		if(letter==charTransZirkumflex||letter==charTransZirkumflex2||letter==charTransZirkumflex3){bool[7]=true;charFault=false;continue;}// case "="
		if(letter==charTransTrema){bool[2]=true;charFault=false;continue;}// case "+"
		//if(letter==charTransMacron|| letter==charTransMacron2){bool[8]=true;charFault=false;continue;}// case "/[&_]/"
		if(letter==charTransBreve){bool[9]=true;charFault=false;continue;}//case "'"
		if(letter==combi||letter==combi2){bool[4]=true;bool[5]=true;charFault=false;continue;}
		if(letter==combi3||letter==combi10){bool[3]=true;bool[6]=true;charFault=false;continue;}
		if(letter==combi4||letter==combi11){bool[3]=true;bool[5]=true;charFault=false;continue;}
		if(letter==combi5||letter==combi6){bool[3]=true;bool[7]=true;charFault=false;continue;}
		if(letter==combi7||letter==combi8){bool[4]=true;bool[7]=true;charFault=false;continue;}
		if(letter==combi9){bool[4]=true;bool[6]=true;charFault=false;continue;}
		if(letter=='%'){
			  if(input.charAt(i+1)=="2"){
				  if(input.charAt(i+2)=="6"){bool[8]=true;i=i+2;}
				  if(input.charAt(i+2)=="7"){bool[9]=true;i=i+2;}
			  }	  
			  charFault=false;continue;
		}
		 // default:
		bool=diacrit(bool,todia,seedia);
		outputString=outputString+bool[0];
		bool[0]="";
		if(letter==";"||letter==":"){outputString=outputString+"·";charFault=false;continue;}
		if(/[\s,\.\-;:\']/.test(letter)){outputString=outputString+letter;charFault=false;continue;}
		if(seeFault){
			if(tagFault){
				if(charFault){
					outputString=outputString.slice(0, outputString.lastIndexOf("</fault>", 0)-7);
					outputString=outputString+letter+"</fault>";
				}else{outputString=outputString+"<fault>"+letter+"</fault>";charFault=true;}
			}else{outputString=outputString+letter;}
		}
		fault++;
	}
	if(bool[0].length!==0){bool=diacrit(bool,todia,seedia);outputString=outputString+bool[0];}
	outputString= unorm_nfc(outputString);
	var output=new Array(outputString/*+"\n"+test*/,fault);
	return output;

};
//-------------------------------------END SPIonic to greek-converter----------------------------------------------------------
//--------------------------------------Greek to betacode - converter----------------------------------------------------------------
conv.prototype.greekToBetacode= function(input){
	var seedia=this.seeDiacritics;
	this.input=input;
	var tagFault=this.tagFault;
	var seeFault=this.seeFault;
	var charFault=false;
	var pre=new conv();
	input=pre.preprocess(input);
	//input = preprocess(input);
	//var test="";
	var alpha={
		"α":"a",
		"β":"b",
		"ϐ":"b",
		"γ":"g",
		"δ":"d",
		"ε":"e",
		"ϵ":"e",
		"ζ":"z",
		"η":"h",
		"ϑ":"q",
		"θ":"q",
		"ι":"i",
		"κ":"k",
		"ϰ":"k",
		"λ":"l",
		"μ":"m",
		"ν":"n",
		"ξ":"c",
		"ο":"o",
		"π":"p",
		"ϱ":"r",
		"ρ":"r",
		"ς":"j",
		"σ":"s",
		"τ":"t",
		"υ":"u",
		"φ":"f",
		"ϕ":"f",
		"χ":"x",
		"ψ":"y",
		"ω":"w",
		"ϝ":"v"
	};
	var fault=0;
	var test="";
	var outputString="";
	var memory="";
	var capital=false;			//Betacode: *
	var akut=false;				//U+0301 ́  Betacode: /
	var gravis=false;			//U+0300 ̀  Betacode: \
	var spasper=false;			//U+0314 ̔  Betacode: (
	var splenis=false; 			//U+0313 ̓  Betacode: )
	var iotasubscriptum=false;	//U+0345  ͅ  Betacode: |
	var zirkumflex=false;		//U+0342  ͂  Betacode: =
	var trema=false;			//U+0308 ¨ Betacode: +
	var macron=false;			//U+0304 ̄  Betacode: & %26 _
	var breve=false;			//U+0306 ̆̆  Betacode: ' %27

	//var charCapital;			//Betacode: *
	var charTransAkut=this.akut;				//U+0301 ́  Betacode: /
	var charTransGravis=this.gravis;			//U+0300 ̀  Betacode: \
	var charTransSpasper=this.spasper;			//U+0314 ̔  Betacode: (
	var charTransSplenis=this.splenis; 			//U+0313 ̓  Betacode: )
	var charTransIotasubscriptum=this.iotasubscriptum;	//U+0345  ͅ  Betacode: |
	var charTransZirkumflex=this.zirkumflex;		//U+0342  ͂  Betacode: =
	var charTransTrema=this.trema;			//U+0308 ¨ Betacode: +
	var charTransMacron=this.macron;			//U+0304 ̄  Betacode: & %26 _
	var charTransBreve=this.breve;			//U+0306 ̆̆  Betacode: ' %27
	
	var charAkut="/";				//U+0301 ́  Betacode: /
	var charGravis="\\";			//U+0300 ̀  Betacode: \
	var charSpasper="(";			//U+0314 ̔  Betacode: (
	var charSplenis=")"; 			//U+0313 ̓  Betacode: )
	var charIotasubscriptum="|";	//U+0345  ͅ  Betacode: |
	var charZirkumflex="=";		//U+0342  ͂  Betacode: =
	var charTrema="+";			//U+0308 ¨ Betacode: +
	var charMacron="&";			//U+0304 ̄  Betacode: & %26 _
	var charBreve=this.betabreve;			//U+0306 ̆̆  Betacode: ' %27
	if(seedia==false){charAkut="";charGravis="";charSpasper="";charSplenis="";charIotasubscriptum="";charZirkumflex="";
		charTrema="";charMacron="";charBreve="";}
	
	for (var i=0;i<input.length;i++){
		var letter= input.charAt(i);
		if(alpha[letter.toLowerCase()]){	
			  if (memory.length===0){
				  if(letter===letter.toLowerCase()){
					  memory=alpha[letter];
				  }else{
					  memory="*"+alpha[(letter+"a").toLowerCase().substr(0,1)]; //+"a" prevents end-of-word variant triggering.
				  }
			  }else{
				  if(capital){memory="*"+memory;capital=false;}
				  if(trema){memory=memory+charTrema;trema=false;}
				  if(spasper){memory=memory+charSpasper;spasper=false;}
				  if(splenis){memory=memory+charSplenis;splenis=false;}
				  if(akut){memory=memory+charAkut;akut=false;}
				  if(gravis){memory=memory+charGravis;gravis=false;}
				  if(zirkumflex){memory=memory+charZirkumflex;zirkumflex=false;}
				  if(macron){memory=memory+charMacron;macron=false;}
				  if(breve){memory=memory+charBreve;breve=false;}
				  if(iotasubscriptum){memory=memory+charIotasubscriptum;iotasubscriptum=false;}
				  outputString=outputString+memory;
				  
				  if(letter===letter.toLowerCase()){memory=alpha[letter];
				  }else{memory="*"+alpha[(letter+"a").toLowerCase().substr(0,1)];}
			  }
			  charFault=false;continue;
		}
		if(letter==charTransAkut){akut=true;charFault=false;continue;}// case "/"
		if(letter==charTransGravis){gravis=true;charFault=false;continue;}
		if(letter==charTransSpasper){spasper=true;charFault=false;continue;}
		if(letter==charTransSplenis){splenis=true;charFault=false;continue;}
		if(letter==charTransIotasubscriptum){iotasubscriptum=true;charFault=false;continue;}
		if(letter==charTransZirkumflex){zirkumflex=true;charFault=false;continue;}
		if(letter==charTransTrema){trema=true;charFault=false;continue;}
		if(letter==charTransMacron){macron=true;charFault=false;continue;}
		if(letter==charTransBreve){breve=true;charFault=false;continue;}//case "'"
		 // default:
		if(trema){memory=memory+charTrema;trema=false;}
		if(spasper){memory=memory+charSpasper;spasper=false;}
		if(splenis){memory=memory+charSplenis;splenis=false;}
		if(akut){memory=memory+charAkut;akut=false;}
		if(gravis){memory=memory+charGravis;gravis=false;}
		if(zirkumflex){memory=memory+charZirkumflex;zirkumflex=false;}
		if(macron){memory=memory+charMacron;macron=false;}
		if(breve){memory=memory+charBreve;breve=false;}
		if(iotasubscriptum){memory=memory+charIotasubscriptum;iotasubscriptum=false;}
		outputString=outputString+memory;
		memory="";
		if(letter=="·"){outputString=outputString+";";charFault=false;continue;}
		if(letter==";"){outputString=outputString+"?";charFault=false;continue;}
		if(letter=="ʹ"){outputString=outputString+"#";charFault=false;continue;}
		if(/[\s,\.\-\?;:/']/.test(letter)||letter==charTransBreve){outputString=outputString+letter;charFault=false;continue;}
		if(seeFault){
			if(tagFault){
				if(charFault){
					//var lastIndex=outputString.lastIndexOf("</fault>", 0);
					outputString=outputString.slice(0, outputString.lastIndexOf("</fault>", 0)-7);
					outputString=outputString+letter+"</fault>";
				}else{outputString=outputString+"<fault>"+letter+"</fault>";charFault=true;}
			}else{outputString=outputString+letter;}
		}
		fault++;
	}

	if(memory.length!==0){
		if(trema){memory=memory+charTrema;}
		if(spasper){memory=memory+charSpasper;}
		if(splenis){memory=memory+charSplenis;}
		if(akut){memory=memory+charAkut;}
		if(gravis){memory=memory+charGravis;}
		if(zirkumflex){memory=memory+charZirkumflex;}
		if(macron){memory=memory+charMacron;}
		if(breve){memory=memory+charBreve;}
		if(iotasubscriptum){memory=memory+charIotasubscriptum;}
		outputString=outputString+memory;
	}
	var output=new Array(outputString/*+"\n"+test*/,fault);
	return output;
};
//--------------------------------------END Greek converter----------------------------------------------------------------
//--------------------------------------SPIonic to Betacode converter----------------------------------------------------------------
conv.prototype.spionicToBetacode= function(input){
var convert=new conv();
convert.seeDiacritics=this.seeDiacritics;
convert.tagFault=this.tagFault;
convert.seeFault=this.seeFault;
convert.betabreve=this.betabreve;
convert.betamacron=this.betamacron;
convert.akut=this.akut;
convert.akut2=this.akut2;
convert.gravis=this.gravis;
convert.splenis=this.splenis;
convert.splenis2=this.splenis2;
convert.spasper=this.spasper;
convert.spasper2=this.spasper2;
convert.iotasubscriptum=this.iotasubscriptum;
convert.zirkumflex=this.zirkumflex;
convert.trema=this.trema;
convert.macron=this.macron;
convert.breve=this.breve;
var output=convert.spionicToGreek(input)[0];

return convert.greekToBetacode(output);
};


//-----------------------------Wrapper end-------------------------------------------------------
}(this));