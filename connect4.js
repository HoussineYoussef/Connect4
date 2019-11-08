function Grille(i,j){
     /* Creation d'une matrice de jeu de la forme suivante pour connaitre la jouabilité
   [[0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0]]
   */
   this.player = 1;
   this.end = 0;

   this.matriceDeJeu = new Array();
   for(var row = 0; row < i; row++)
    this.matriceDeJeu[row] = new Array();
    for(var row = 0; row < i; row++)
        for(var col = 0; col < j; col++)
          this.matriceDeJeu[row][col] = 0;
}

Grille.prototype.pos = function(i,j){
  return i*7+j ;
}

Grille.prototype.cell = function(i,j){
    return this.matriceDeJeu[i][j];
}

Grille.prototype.modifcell = function(i,j){

  var who_play = document.getElementById("whoPlay");
  if(this.player == 1){
    this.matriceDeJeu[i][j] = 3;
    this.testligne(i,j);
    this.player = 2;
  }
  else{
    this.matriceDeJeu[i][j] = 5;
    this.testligne(i,j);
    this.player = 1;
  }
  this.modifColor(i,j);
  if(this.player == 1){
    who_play.style.color = "red";
  }
  else{
    who_play.style.color = "yellow";
  }
  who_play.innerHTML = "AU TOUR DU JOUEUR " + this.player;
}

Grille.prototype.modifColor = function(i,j){
    var x = document.getElementById(this.pos(i,j));
    if(this.matriceDeJeu[i][j] == 5){
      x.style.backgroundColor = "yellow";
    }
    else if(this.matriceDeJeu[i][j] == 3){
      x.style.backgroundColor = "red";
    }
}

Grille.prototype.jouer = function(i,j){
  if (this.end == 0){
    if (this.matriceDeJeu[5][j] == "0"){
      this.modifcell(5,j);
    }
    else if (this.matriceDeJeu[4][j] == "0"){
      this.modifcell(4,j);
    }
    else if (this.matriceDeJeu[3][j] == "0"){
      this.modifcell(3,j);
    }
    else if (this.matriceDeJeu[2][j] == "0"){
      this.modifcell(2,j);
    }
    else if (this.matriceDeJeu[1][j] == "0"){
      this.modifcell(1,j);
    }
    else if (this.matriceDeJeu[0][j] == "0"){
      this.modifcell(0,j);
    }
  }
}

Grille.prototype.testligne = function(i,j){

  caseClick = this.matriceDeJeu[i][j];
  xPlus1 = this.matriceDeJeu[i][j+1];
  xPlus2 = this.matriceDeJeu[i][j+2];
  xPlus3 = this.matriceDeJeu[i][j+3];

  xMoins1 = this.matriceDeJeu[i][j-1];
  xMoins2 = this.matriceDeJeu[i][j-2];
  xMoins3 = this.matriceDeJeu[i][j-3];

//Pour vertical
  if (i <= 2){
    yPlus1 = this.matriceDeJeu[i+1][j];
    yPlus2 = this.matriceDeJeu[i+2][j];
    yPlus3 = this.matriceDeJeu[i+3][j];
  }

//Pour diagonal droite
  if ((i == 3 || i == 4 || i == 5) && (j == 3 || j == 2 || j == 1 || j == 0)){
    xPlus1_and_yMoins1 = this.matriceDeJeu[i-1][j+1];
    xPlus2_and_yMoins2 = this.matriceDeJeu[i-2][j+2];
    xPlus3_and_yMoins3 = this.matriceDeJeu[i-3][j+3];
  }
  if ((i == 2 || i == 1 || i == 0) && (j == 3 || j == 2 || j == 1 || j == 0)){
    xPlus1_and_yPlus1 = this.matriceDeJeu[i+1][j+1];
    xPlus2_and_yPlus2 = this.matriceDeJeu[i+2][j+2];
    xPlus3_and_yPlus3 = this.matriceDeJeu[i+3][j+3];
  }

//Pour diagonal gauche
  if ((i == 3 || i == 4 || i == 5) && (j == 3 || j == 4 || j == 5 || j == 6)){
    xMoins1_and_yMoins1 = this.matriceDeJeu[i-1][j-1];
    xMoins2_and_yMoins2 = this.matriceDeJeu[i-2][j-2];
    xMoins3_and_yMoins3 = this.matriceDeJeu[i-3][j-3];
  }
  if ((i == 2 || i == 1 || i == 0) && (j == 3 || j == 4 || j == 5 || j == 6)){
    xMoins1_and_yPlus1 = this.matriceDeJeu[i+1][j-1];
    xMoins2_and_yPlus2 = this.matriceDeJeu[i+2][j-2];
    xMoins3_and_yPlus3 = this.matriceDeJeu[i+3][j-3];
  }

//Pour topD2bot1G
  if ((i == 2 || i == 3 || i == 4) && (j == 4 || j == 3 || j == 2 || j == 1)){
    xPlus1_and_yMoins1 = this.matriceDeJeu[i-1][j+1];
    xPlus2_and_yMoins2 = this.matriceDeJeu[i-2][j+2];
    xMoins1_and_yPlus1 = this.matriceDeJeu[i+1][j-1];
  }

//Pour topD1bot2G
  if ((i == 1 || i == 2 || i == 3) && (j == 5 || j == 4 || j == 3 || j == 2)){
    xPlus1_and_yMoins1 = this.matriceDeJeu[i-1][j+1];
    xMoins1_and_yPlus1 = this.matriceDeJeu[i+1][j-1];
    xMoins2_and_yPlus2 = this.matriceDeJeu[i+2][j-2];
  }

//Pour topG2bot1D
  if ((i == 2 || i == 3 || i == 4) && (j == 5 || j == 4 || j == 3 || j == 2)){
    xMoins1_and_yMoins1 = this.matriceDeJeu[i-1][j-1];
    xMoins2_and_yMoins2 = this.matriceDeJeu[i-2][j-2];
    xPlus1_and_yPlus1 = this.matriceDeJeu[i+1][j+1];
  }

//Pour topG1bot2D
  if ((i == 1 || i == 2 || i == 3) && (j == 4 || j == 3 || j == 2 || j == 1)){
    xMoins1_and_yMoins1 = this.matriceDeJeu[i-1][j-1];
    xPlus1_and_yPlus1 = this.matriceDeJeu[i+1][j+1];
    xPlus2_and_yPlus2 = this.matriceDeJeu[i+2][j+2];
  }

  right = function(){ //regarde 3 à droite
    return (caseClick + xPlus1 + xPlus2 + xPlus3);
  }

  left = function(){ //regarde 3 à gauche
    return (caseClick + xMoins1 + xMoins2 + xMoins3);
  }

  midRight= function(){ //regarde 2 à droite et 1 à gauche
    return (caseClick + xPlus1 + xPlus2 + xMoins1);
  }

  midLeft = function(){ //regarde 1 à droite et 2 à gauche
    return (caseClick + xPlus1 + xMoins1 + xMoins2);
  }

  vertical = function(x,y){ // regarde 3 en dessous à partir de 4 cases verticales jouées sur la même ligne
    if (x <= 2){
      return caseClick + yPlus1 + yPlus2 + yPlus3;
    }
  }

//=================TEST DIAGONAL===========================//
  topRDiago = function(x,y){
    if ((x >= 3) && (y <= 3))
      return caseClick + xPlus1_and_yMoins1 + xPlus2_and_yMoins2 + xPlus3_and_yMoins3;
  }

  botRDiago = function(x,y){
    if ((x == 2 || x == 1 || x == 0) && (y == 3 || y == 2 || y == 1 || y == 0)){
      return caseClick + xPlus1_and_yPlus1 + xPlus2_and_yPlus2 + xPlus3_and_yPlus3;
  }
}

  topLDiago = function(x,y){
    if ((x == 3 || x == 4 || x == 5) && (y == 3 || y ==  4 || y == 5 || y == 6 )){
      return caseClick + xMoins1_and_yMoins1 + xMoins2_and_yMoins2 + xMoins3_and_yMoins3;
  }
}

  botLDiago = function(x,y){
    if ((x == 2 || x == 1 || x == 0) && (y == 3 || y == 4 || y == 5 || y == 6)){
      return caseClick + xMoins1_and_yPlus1 + xMoins2_and_yPlus2 + xMoins3_and_yPlus3;
  }
}

  topD2bot1G = function(x,y){//regarde 2 top à droite et 1 bot à gauche
    if ((i == 2 || i == 3 || i == 4) && (j == 4 || j == 3 || j == 2 || j == 1))
    return caseClick + xPlus1_and_yMoins1 + xPlus2_and_yMoins2 + xMoins1_and_yPlus1;
  }

  topD1bot2G = function(x,y){//regarde 1 top à droite et 2 bot à gauche
    if ((i == 1 || i == 2 || i == 3) && ( j == 5 || j == 4 || j == 3 || j == 2))
      return caseClick + xPlus1_and_yMoins1  + xMoins1_and_yPlus1 + xMoins2_and_yPlus2;
  }

  topG2bot1D = function(x,y){//regarde 2 top à gauche et 1 bot à droite
    //  i 0 1 2 // j 2 3 4 5
    if ((i == 2 || i == 3 || i == 4) && ( j == 5 || j == 4 || j == 3 || j == 2))
      return caseClick + xMoins1_and_yMoins1  + xMoins2_and_yMoins2 + xPlus1_and_yPlus1;
  }

  topG1bot2D = function(x,y){//regarde 1 top à gauche et 2 bot à droite
  //  i 1 2 3 // j 1 2 3 4
  if ((i == 1 || i == 2 || i == 3) && (j == 4 || j == 3 || j == 2 || j == 1))
    return caseClick + xMoins1_and_yMoins1 + xPlus1_and_yPlus1 + xPlus2_and_yPlus2;
  }

//Test Grandes Lignes
  testHorizontal = function(x,y){
    if ((y == 0) || (y == 6)){
      if (y == 0){a = right();}
      else if (y == 6){a = left();}
      if ((a == 12) || (a == 20))
        return 1;
    }
    else if ((y == 1) || (y == 5)){
      if (y == 1){a = right(); m = midRight();}
      else if (y == 5){a = left(); m = midLeft();}
      if ((a == 12) || (a == 20) || (m == 12) || (m == 20))
        return 1;
    }
    else if ((y == 2) || (y == 4)){
      if (y == 2){a = right();}
      else if (y == 4){a = left();}
      mr = midRight(); ml = midLeft();
      if ((a == 12) || (a == 20) || (mr == 12) || (mr == 20) || (ml == 12) || (ml == 20))
        return 1;
    }
    else if (y == 3){
      r = right(); l = left(); mr = midRight(); ml = midLeft();
      if ((r == 12) || (r == 20) || (mr == 12) || (mr == 20) || (ml == 12) || (ml == 20) || (l == 12) || (l == 20))
        return 1;
    }
  }
  testVertical = function(x,y){
    if ((vertical(x) == 12) || (vertical(x) == 20))
      return 1;
  }
  testDiagonal = function(x,y){
    if ((x == 0) || (x == 5)){
      if (x == 0){
        if(y <= 2)
         var a = botRDiago(x,y);
      }
      else if (x == 5){
        if(y <= 2)
          var a = topRDiago(x,y);
      }
      if (a == 12 || a == 20){return 1;}
//---------------------------------------------//
      if (x == 0){
        if(y == 3){var a = botRDiago(x,y); var b = botLDiago(x,y);}}
      else if (x == 5){
        if(y == 3){var a = topRDiago(x,y); var b = topLDiago(x,y);}}
        if (a == 12 || a == 20 || b == 12 || b == 20)
          return 1;
//---------------------------------------------//
      if (x == 0){if(y >=4 ){a = botLDiago(x,y)}}
      else if (x == 5){if(y >=4 ){a = topLDiago(x,y)}}
      if (a == 12 || a == 20){return 1;}
    }
    if ((x == 1) || (x == 4)){
      //------------------------------------------------------------//
      if ((y == 0) || (y == 6)){
        if (y == 0){
          if (x == 1){a = botRDiago(x,y);}
          else if (x == 4){a = topRDiago(x,y);}
        }
        else if (y == 6){
          if (x == 1){a = botLDiago(x,y);}
          else if (x == 4){a = topLDiago(x,y);}
        }
        if (a == 12 || a == 20)
          return 1;
      }
      //------------------------------------------------------------//
      else if ((y == 1) || (y == 5)){
        if (y == 1){
          if (x == 1){a = botRDiago(x,y); b = topG1bot2D(x,y);}
          else if (x == 4){a = topRDiago(x,y); b = topD2bot1G(x,y);}
        }
        else if (y == 5){
          if (x == 1){a = botLDiago(x,y); b = topG1bot2D(x,y);}
          else if (x == 4){a = topLDiago(x,y); b = topG2bot1D(x,y);}
        }
        if (a == 12 || a == 20 || b == 12 || b == 20)
          return 1;
        }
      //------------------------------------------------------------//
      else if ((y == 2) || (y == 4)){
        if (y == 2){
          if (x == 1){a = botRDiago(x,y); b = topD1bot2G(x,y); c = topG1bot2D(x,y);}
          else if (x == 4){a = topRDiago(x,y); b = topG2bot1D(x,y); c = topD2bot1G(x,y);}
        }
        else if (y == 4){
          if (x == 1){a = botLDiago(x,y); b = topD1bot2G(x,y); c = topG1bot2D(x,y);}
          else if (x == 4){a = topLDiago(x,y); b = topG2bot1D(x,y); c = topD2bot1G(x,y);}
        }
        if (a == 12 || a == 20 || b == 12 || b == 20 || c == 12 || c == 20)
          return 1;
      }
      //------------------------------------------------------------//
      else if (y == 3){
        if (x == 1){a = botRDiago(x,y); b = botLDiago(x,y); c = topD1bot2G(x,y); d = topG1bot2D(x,y);}
        else if (x == 4){a = topRDiago(x,y); b = topLDiago(x,y); c = topG2bot1D(x,y); d = topD2bot1G(x,y);}
        if (a == 12 || a == 20 || b == 12 || b == 20 || c == 12 || c == 20 || d == 12 || d == 20)
          return 1;
  }
    }
    if ((x == 2) || (x == 3)){
      //------------------------------------------------------------//
      if ((y == 0) || (y == 6)){
        if (y == 0){
          if (x == 2){a = botRDiago(x,y);}
          else if (x == 3){a = topRDiago(x,y);}
        }
        else if (y == 6){
          if (x == 2){}
          else if (x == 3){}
        }
        if (a == 12 || a == 20)
          return 1;
      }
      //------------------------------------------------------------//
      else if ((y == 1) || (y == 5)){
        if (y == 1){
          if (x == 2){a = botRDiago(x,y); b = topG1bot2D(x,y); c = topD2bot1G(x,y);}
          else if (x == 3){a = topRDiago(x,y); b = topG1bot2D(x,y); c = topD2bot1G(x,y);}
        }
        else if (y == 5){
          if (x == 2){a = botLDiago(x,y); b = topG1bot2D(x,y); c = topD1bot2G(x,y);}
          else if (x == 3){a = topLDiago(x,y); b = topD1bot2G(x,y); c = topG2bot1D(x,y);}
        }
        if (a == 12 || a == 20 || b == 12 || b == 20 || c == 12 || c == 20)
          return 1;
        }
      //------------------------------------------------------------//
      else if ((y == 2) || (y == 4)){
        b = topD1bot2G(x,y); c = topG1bot2D(x,y); d = topD2bot1G(x,y); e = topG2bot1D(x,y);
        if (y == 2){
          if (x == 2){a = botRDiago(x,y);}
          else if (x == 3){a = topRDiago(x,y);}
        }
        else if (y == 4){
          if (x == 2){a = botLDiago(x,y);}
          else if (x == 3){a = topLDiago(x,y);}
        }
        if (a == 12 || a == 20 || b == 12 || b == 20 || c == 12 || c == 20 || d == 12 || d == 20 || e == 12 || e == 20)
          return 1;
      }
      //------------------------------------------------------------//
      else if (y == 3){
        c = topD1bot2G(x,y); d = topG1bot2D(x,y); e = topD2bot1G(x,y); f = topG2bot1D(x,y);
        if (x == 2) { a = botRDiago(x,y); b = botLDiago(x,y);}
        else if (x == 3) { a = topRDiago(x,y); b = topLDiago(x,y);}
        if (a == 12 || a == 20 || b == 12 || b == 20 || c == 12 || c == 20 || d == 12 || d == 20 || e == 12 || e == 20 || f == 12 || f == 20)
          return 1;
      }
    }
}

  if (testHorizontal(i,j) == 1 || testVertical(i,j) == 1 || testDiagonal(i,j) == 1){
    this.end = 1;
    alert("Le joueur " + this.player + " gagne");
  }
}

Grille.prototype.afficher = function(){
  var onClick = function(cases,element,i,j) {
    return function() {
      element.jouer(i,j);
    }
  }
    var table = document.getElementById("grille");
    table.inneHTML = "";

    // DEBUT STYLE DE LA TABLE
    table.style.backgroundColor = "black";
    table.style.color = "white";
    table.style.textAlign = "center";
    table.align = "center";
    // FIN STYLE DE LA TABLE

    for(row = 0; row <6; row ++){
      tr = document.createElement("TR");
      for(col = 0; col<7; col++){
        td = document.createElement("TD");
        td.id = this.pos(row,col);
        td.onclick = onClick(td,this,row,col);
        tr.appendChild(td);

        // AUTRE STYLE DE LA TABLE
        td.style.width = "4em";
        td.style.height = "4em";
        td.style.borderRadius = "3em";
        // FIN STYLE DE LA TABLE
    }
   table.appendChild(tr);
 }
 for(row = 0; row <6; row ++)
   for(col = 0; col<7; col++)
    this.modifColor(row,col);
}

Grille.prototype.recommencer = function(){
  this.end = 0;
  this.player = 1;
  var who_play = document.getElementById("whoPlay");
  who_play.style.color = "red";
  who_play.innerHTML = "AU TOUR DU JOUEUR " + this.player;
  for(var row = 0; row < 6; row++)
    for(var col = 0; col < 7; col++){
      this.matriceDeJeu[row][col] = 0;
      var x = document.getElementById(this.pos(row,col));
      x.style.backgroundColor = "";
    }
  localStorage.clear();
}

Grille.prototype.sauvegarder = function(){
  if (this.end == 0){
    localStorage.setItem("Grille",JSON.stringify(this));
  }
}
