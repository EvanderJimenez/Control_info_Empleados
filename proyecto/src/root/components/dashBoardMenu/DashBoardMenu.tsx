import React, { useState } from "react";

export default function DashBoardMenu() {
  const [isAsideActive, setAsideActive] = useState(false);

  const handleMenuClick = () => {
    setAsideActive(!isAsideActive);
  };

  return (
    <>
      <aside className={`aside ${isAsideActive ? "active" : ""} `}>
        <header className="head">
          <div className="profile">
            <img src="/WelcomeLogo.png" alt="" />
            <p>NameUser</p>
          </div>
          <i className="inline-block w-8 h-8" onClick={handleMenuClick}>
            <img src="/DashBoardMenu.png" alt="" />
          </i>
        </header>
        <section className="options">
          <div>
            <i className="inline-block w-6 h-6">
              <img src="/pencil.png" alt="" />
            </i>

            <a className="option" href="#">
              Justifications
            </a>
          </div>
          <div>
            <i className="inline-block w-6 h-6">
              <img src="/WhiteCalendar.png" alt="" />
            </i>
            <span className="option">Time page</span>
          </div>
          <div>
            <i className="inline-block w-6 h-6">
              <img src="/Timer.png" alt="" />
            </i>
            <span className="option">Brands page</span>
          </div>
        </section>
      </aside>
    </>
  );
}
