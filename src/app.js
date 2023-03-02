import "./scss/style.scss";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import CSSPlugin from "gsap/CSSPlugin";

// REGISTER GSAP PLUGINS
gsap.registerPlugin( Draggable, CSSPlugin );

// SECTION ONE GSAP

function section_1_moveBox(){
  let anim_001 = gsap.fromTo(
    "#page-wrapper .section-1 .box",
    // from state
    {
      left: "10px",
    },
    // to state
    {
      left: ( index, target) => {
        let distance = target.parentNode.clientWidth - target.clientWidth - 10;
        // return distance || 300;
        return distance;
      },
      duration: 2,
      ease: "bounce.out"
    }
  )
  return;
}


let button1 = document.querySelector(".section-1 #btn-1");
button1.addEventListener(
  "click",
  ( ev ) => {
    section_1_moveBox();
    return;
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
        ease: "power2.out",
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
    0.6
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

// SECTION 3: Draggable

Draggable.create(
  ".section-3 .drag-object",
  {
    bounds: document.querySelector("section.section-3 .section-wrapper .drag-container")
  }
)

let button2 = document.getElementById("btn-2");
button2.addEventListener(
  "click",
  () => {
    gsap.set(

      ".section-3 .drag-object",
      {
        clearProps: true
      }
    )
    return;
  }
)