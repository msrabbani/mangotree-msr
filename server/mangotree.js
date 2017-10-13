var cron = require('node-cron');
var firebase = require('firebase');

// Initialize Firebase

  // Initialize Firebase
  var config = {
     apiKey: "AIzaSyBv5iI_hyeHIZAfQ5awl6XYXS9aJHos--Q",
     authDomain: "intro-firebase-89a6f.firebaseapp.com",
     databaseURL: "https://intro-firebase-89a6f.firebaseio.com",
     projectId: "intro-firebase-89a6f",
     storageBucket: "intro-firebase-89a6f.appspot.com",
     messagingSenderId: "869973274847"
  };

  firebase.initializeApp(config);

  var db = firebase.database()

"use strict"

class Fruit {
  constructor () {
    this.quality = this.cekKualitasBuah();
  }
  cekKualitasBuah () {
    let kualitasAcak = Math.floor(Math.random() * 2);
    return (kualitasAcak == 0)? 'bad': 'good'
  }
}
class FruitTree {
  constructor () {
    this.umur = 0;
    this.tinggi = 0;
    this.buah = [];
    this.statusKesehatan = true;
    this.maxUmur = 20;
    this.panen = ''
  }

  getAge () {
    return this.umur
  }

  getHeight () {
    return this.tinggi
  }

  getFruits () {
    return this.buah
  }

  getHealtyStatus () {
    return this.statusKesehatan
  }

  grow (inputmaxUmur) {
    this.umur++
    if (this.umur < inputmaxUmur) {
      if (this.umur <= (inputmaxUmur-10)) {
        this.tinggi = this.tinggi + parseFloat((Math.random() * 1).toFixed(2))
      }
    } else if(this.umur == inputmaxUmur) {
      this.statusKesehatan = false;
    }
  }

  produceFruits () {
    let jumlahBuahdiProduksi = Math.ceil(Math.random() * 15);
    for (var i = 0; i < jumlahBuahdiProduksi; i++) {
      this.buah.push(new Fruit())
    }
    // console.log("ini juamlah buah",jumlahBuahdiProduksi);
  }

  harvest () {
    let goodFruit = 0;
    let badFruit = 0;

    for (var i = 0; i < this.buah.length; i++) {
      if (this.buah[i].quality == 'good') {
        goodFruit++
      } else {
        badFruit++
      }
    }
    let fruitsHarvested = this.buah.length;
    this.panen = this.buah.length
    return `${fruitsHarvested} (${goodFruit} good, ${badFruit} bad)`
  }
}


class MangoTree extends FruitTree {
  constructor(name) {
    super();
    this.name = name;
    this.maxUmur = 20;
  }
}

class Mango extends Fruit{
}

//   driver code untuk release 0
   let mangoTree = new MangoTree('manggo')

   db.ref('tree').set(mangoTree)

   let grow = cron.schedule('*/5 * * * * * ', function () {
     if (mangoTree.statusKesehatan !== false) {
       mangoTree.grow(1000)
       mangoTree.produceFruits(10)
       mangoTree.harvest()
       db.ref('tree').set(mangoTree)
       console.log(`[Year ${mangoTree.umur} Report] Height = ${mangoTree.tinggi} Meter| Fruits harvested = ${mangoTree.panen}`)
       //  } while (mangoTree.statusKesehatan != false)
     } else {
       grow.stop()
       console.log('mango nya modars');
     }
   })
