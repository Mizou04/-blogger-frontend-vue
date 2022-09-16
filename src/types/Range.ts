/**@Range never starts at 0*/
export class Range{
  constructor(public from : number, public to : number){
    this.from = from;
    this.to = to;
    Range.equalize(this);

  }

  static equalize(range : Range){
    if(range.from <= 0 ){
      range.from = 1;
    }
    if(range.to <= 0){
      range.to = range.from;
    }
    if(range.to < range.from){
      [range.from, range.to] = [range.to, range.from];
    }
    if(range.to == range.from){
      if(range.from > 1){
        range.from--;
      } else{
        range.to++;
      }
    }
    return range;
  }
  /**@returns next range */
  static next(range : Range) : Range{
    return new Range(range.to+1, range.to + (range.to - range.from) + 1);
  }
  static previous(range : Range) : Range{
    const newRange = new Range(range.from - (range.to - range.from)-1, range.to - (range.to - range.from)-1)
    Range.equalize(newRange);
    return newRange; 
  }
  static goTo(page : number, range : Range) : Range{
    if(page <= 0){
      page = 1;
    }
    return new Range(range.to * page - (range.to-range.from) , range.to * page);
  }
} 