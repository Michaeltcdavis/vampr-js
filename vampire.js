class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let lineNum = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      lineNum++;
      currentVamp = currentVamp.creator;
    }
    return lineNum;
  }

  // Returns true if this vampire is more senior than the other vampire. 
  //(Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  searchOffspring(previousVamp, vampire) {
    if (!this.offspring.length) {
      return false;
    }
    if (this.offspring.includes(vampire)) {
      return this;
    }
    for (let descendant of this.offspring) {
      if (descendant !== previousVamp) {
      if (descendant === vampire) {
        return this;
      }
        if (descendant.searchOffspring(previousVamp, vampire)) {
          return this;
        }
      }
    }
    return false;
  }

  closestCommonAncestor(vampire) {
    let previousVamp = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      if (currentVamp === vampire) {
        return currentVamp;
      }
      if (currentVamp.searchOffspring(previousVamp, vampire)) {
        return currentVamp;
      }
      previousVamp = currentVamp;
      currentVamp = currentVamp.creator;
    }
    //returns root if loop reaches the end
    return currentVamp;
  }
}

module.exports = Vampire;

