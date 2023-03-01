import "./scss/style.scss";
import gsap from "gsap";

// SECTION ONE GSAP
let anim_001 = gsap.to(
  "#page-wrapper .section-1 .box",
  {
    x: ( index, target) => {
      let distance = target.parentNode.clientWidth - target.clientWidth - 20;
      return distance || 300;
    },
    duration: 2.5,
    paused: true,
  }
)

let button1 = document.querySelector(".section-1 #btn-1");
button1.addEventListener(
  "click",
  ( ev ) => {
    anim_001.restart();
  }
)


// SECTION 2: STAGGER GRID  

let group_1 = document.querySelectorAll( ".section-2 .grid .square" );

function section_2_stagger( index ){
  let grid = document.querySelector( ".section-2 .grid" );
  if( grid.getAttribute("data-can-animate") != "true" ) return;

  grid.setAttribute("data-can-animate", "false");

  let timeline = gsap.timeline({
    onComplete: () => {
      grid.setAttribute( "data-can-animate", true );
      return;
    }
  });

  timeline.to(
    ".section-2 .grid .square",
    {
      scale: .25,
      duration: 0.75,
      backgroundColor: "#8d99aeff",
      stagger: {
        from: index,
        grid: [7,9],
        ease: "power1.inOut",
        amount: 0.75
      }
    }
  )

  timeline.to(
    ".section-2 .grid .square",
    {
      scale: 1,
      duration: 0.75,
      backgroundColor: "#ef233cff",
      stagger: {
        from: index,
        grid: "auto",
        ease: "power1.inOut",
        amount: 0.75
      }
    },
    "+=0.25"
  )

  timeline.play();
  return;
}

let counter_1 = 0;
group_1.forEach(
  ( square ) => {
    square.setAttribute( "data-index", counter_1 );
    square.addEventListener(
      "click",
      ( ev ) => {
        let index = ev.target.getAttribute( "data-index" );
        section_2_stagger( index );
        return;
      }
    )

    counter_1++;
    return;
  }
)
