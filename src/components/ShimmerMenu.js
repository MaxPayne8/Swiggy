import React from "react";

const ShimmerMenu = () => {
  const foodFacts = [
    " During 1800s, it was believed that ketchup has medicinal qualities. It could cure ailments like diarrhea.",
    "Chicken contains 266 percent more fat than it did 50 years ago. A study has claimed that chicken, now, has more fat than proteins.",
    "The most stolen food in the world is 'cheese'. As per reports, 4 percent of the total cheese produced globally is stolen.",
    " Peanuts can be used to make dynamite. The oil derived from peanuts can be processed to produce glycerol. This, in turn, can be used to make nitroglycerin, one of the constituents of dynamite.  ",
    " Chocolate was once used as currency. The Maya civilization used it as money.",
    " You'll be amazed to know that apples and roses are connected. They belong to the same family. Same applies to cherries, pears, and apricots. They belong to rose family called Rosaceae.",
    " Pure honey has a very long shelf life. It won't spoil and can last up to 3000 years.",
    "The wax used to coat candies and cars is the same. Carnauba, also called Brazil wax and palm wax, is not only used to cover the little gummy candies, but also your cars to make them look shiny.",
    "Ripe cranberries can bounce like rubber balls and thus, they're also referred to as bounce berries. The bounce signifies the berry is still nice and firm.",
    " Potatoes can absorb and reflect radio wave signals. In 2012, when Boeing wanted to test out its wireless signal on new plane, they ended up placing huge piles of potatoes on the seats.",
  ];
  return (
    <div className="">
      <h1 className="mt-48 text-center w-2/3 ml-48 font-semibold bg-slate-500 text-2xl rounded-lg z-10">
        {foodFacts[Math.floor(Math.random() * 11)]}
      </h1>
    </div>
  );
};

export default ShimmerMenu;
