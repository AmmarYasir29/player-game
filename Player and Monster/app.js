console.log("test");
new Vue({
  el: "#app",
  data: {
    yourHealth: 100,
    monestarHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    runGame: function () {
      this.gameIsRunning = true;
      this.yourHealth = 100;
      this.monestarHealth = 100;
    },
    attack: function () {
      let damage = this.collectDamage(12, 5);
      this.yourHealth -= damage;
      this.turns = [
        {
          text: "the player hir monster " + damage,
        },
      ];
      if (this.checkWon()) {
        return;
      }
      damage = this.collectDamage(10, 3);
      this.monestarHealth -= damage;
      this.turns = [
        {
          text: "the monster hir player " + damage,
        },
      ];
      this.checkWon();
    },
    specialAttack: function () {
      this.yourHealth -= this.collectDamage(20, 10);
      if (this.checkWon()) {
        return;
      }
      this.monestarHealth -= this.collectDamage(12, 5);
      this.checkWon();
    },
    heal: function () {
      if (this.yourHealth <= 90) this.yourHealth += 10;
      else this.yourHealth = 100;
      this.yourHealth -= this.collectDamage(10, 3);
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    collectDamage: function (max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWon: function () {
      if (this.monestarHealth <= 0) {
        if (confirm("You Won! New Game?")) {
          this.runGame();
        } else this.gameIsRunning = false;
        return true;
      } else if (this.yourHealth <= 0) {
        if (confirm("You Lost do you want to rePlay?")) {
          this.runGame();
        } else this.gameIsRunning = false;

        return true;
      }
      return false;
    },
  },
});
