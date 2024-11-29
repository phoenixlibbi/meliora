"use client";
import React, { useEffect, useState } from "react";
import { StickyScroll } from "./../ui/sticky-scroll-reveal.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const content = [
  {
    title: "Carpet Washing",
    description:
      "Revitalize your carpets with our professional carpet washing service. We use advanced cleaning techniques and eco-friendly blogs to remove dirt, stains, and allergens, leaving your carpets fresh and like new.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="https://plus.unsplash.com/premium_photo-1677362757289-7e1bee0e3bd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FycGV0JTIwd2FzaHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Sofa Cleaning",
    description:
      "Give your sofas a deep clean with our expert sofa washing service. We tackle tough stains and remove embedded dirt, ensuring your sofas look and feel great. Enjoy a cleaner and healthier living environment.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://plus.unsplash.com/premium_photo-1679500355595-5096398b1db7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mYSUyMGNsZWFuaW5nfGVufDB8fDB8fHww"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Tank Washing",
    description:
      "Ensure your water tanks are clean and safe with our professional tank washing service. We remove contaminants and ensure your tanks are in top condition for clean, fresh water.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKP9xsQNNTxQCdlRGi4ilrizWi1XYOlm0NWA&usqp=CAU"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Termite Control",
    description:
      "Protect your home with our effective termite control solutions. Our experts use advanced treatments to eliminate termites and prevent future infestations, ensuring your property remains safe and secure.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="https://plus.unsplash.com/premium_photo-1661306473412-23ca865974dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVybWl0ZSUyMGNvbnRyb2x8ZW58MHx8MHx8fDA%3D"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Drain Unblocking",
    description:
      "Solve your drainage issues with our efficient drain unblocking service. We quickly clear blockages and ensure your drainage system is running smoothly, preventing future problems.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQchS9_KkyxeGk7KyD0F1U3Oe2V3QJesaPDg&usqp=CAU"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Pool Cleaning",
    description:
      "Keep your pool sparkling clean with our professional pool cleaning service. We handle everything from debris removal to chemical balancing, ensuring your pool is always ready for a swim.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgVFRUYGRgaGxoaHBsbGhobHRobGxoZGxobHR0bIS0kHR0qIRoYJTclKi4xNDQ0GiM6PzozPi0zNDEBCwsLEA8QHRISHzMqIyozMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBAUGAAECB//EAEUQAAEDAgQDBgMGAwUHBAMAAAECAxEAIQQSMUEFUWEGInGBkaETMrFCUmLB0fAUcuEzgpKy8QcVFiNDotIkU4OTVGNz/8QAGgEAAgMBAQAAAAAAAAAAAAAAAQIAAwQFBv/EAC4RAAICAQMDAgUDBQEAAAAAAAABAhEDEiExBEFRE2EUInGBkTKh0QVCscHwI//aAAwDAQACEQMRAD8Aq6+FIn+w/wC01weHtRHwIPMZhTQeJSVfFVFhv+tcnFQkgOEmRBg2rLT8nReSL7ISVw9mxyqBH4j+dcDhzNjmPmalW1WlSwcwkTWggGwKSdKVxfkKnHwgWAwyGlJUhUlKkqvB0MxpT3GsSHl/EU22FFOXuJyyZ+c3uqLTSi0lN+74V1h21EhVjfQ/SqJR3A5xqkjhvAlQ+cDlaaLh8EUEkqmNNqZU6U/ZT+laDkgkjU/TWqMkWifLWy3G3lEBMnat4Nfvoa4x6xkAHKgYBUkCss4ETLGyDAqUY5zUTh1VIsLrPpHJfIkTlUVaGYiPKpfhqSpIsIB13J51XmXosZ0/c1YMLj0phCRIgX/WtPTaVO5bIqy3ppEwK3Q0r5xXc16CMotbMwtG61QF4tI3nwvSrnEeQj3qqfUY48saOOT7EiTQHMWkbz4XqKcxJOpJpdbhrJPr3/ai6ODyPv8AECTYADrUZiMUSTJJ8/yobi6UcXWHJmlPll8YRjwcPPmo3EuTTDzlqQeXVW7GFcSRF6SxC+VqM+uY5xSLi9T6U8YgbFXlXt40liF6D7s+9HfVM36UniVgKOlr/StEEI2DXa1uuvKd96WWnY6yNulzXTq7X0HL2oLiwSkZztp1672q+KEbMVEaxeZ6da2VXzZh8oHUz7VwtYlW8HbxoBXKlDl6RVyixbCtDXmDbfXeiNgRJBhNgfSlCc5MW003PLwo5UM2+skfn4UWgIbbFhISPFUVlDzI3JrKFew9jbiMspzJN+torgMk6KT61y5hFlRIFj1rbLDg0FXEDFFkjMkx15mittnNMp9aT/hl8r+NdhhybC+tBkJFaJM20rFLsANRG9LIQ5pl50VaFQfCqmu4xw4slfKjpWbDkPrUeyhU+FMoBKiUg61mmtTCiScXLQPJRBoWGVCxXCCfhqBGjg9xWJsoSKqyQCmWFlw08w5pUMyq4pltwjTmayuNjk2hy9SfDsXlOk8qrzT03pxty9IrTtB5LKccsmZihqxilamf3yqPQ7byoSXavcmKookvi1vPSKXa38WkCNqcoK10BTlCU5UIFcXSrq64W5SrrlSiG3XKSWlStAo+AJrTi6uaV90eA0q/Fi1XuJKVFIPDHlGzR87D3rP+GXlalCZ6k1cFr8aGoKOgPnWqOCKF1FYR2T1zum/3Uj86I12Rw6TKs6v5lfkmrAWlfsVoYdXQetXRxxXYFiOH4Nh0fKyjxKZPqahuIoQXFDImJ+6NvKrOjxHtVTxAUVKMbn609UFCK8E0f+ki/wCFIpTE8MZSlZDabAnzjpUjakuLGGlk6ZfrRomxT0LIHO+nKszEHczYClkvR46CsC+fgLwfGjpKdRM4RsZB3uf1NZUOkjmDWUNw6l4Jll5UiTNa/ilCwN5HvS4xWkAa1iMSJNhTjWNh6QSdZrtvEH0pU4nWABfbrW28Ta4BkHagwjTuLIIg6gGms2YZrxUOrE6SAakm3JbFI0FA0uwSNjWNrIFjQlZiScojyrWe8SmbWmqnAljrDh+Gu+i0Gi/E0M3pBDndWJGqNByNGSsECDPlFVTiFMlWsSatLDodwq0fbZIUOZQoSfz9KpaMSLjlzqb4Jj/h4hOb5VpCFeCh+sUijuGxjCuU+0uol5Hw3Ftn7JMeGo9qYaeqh46YyZNoetQEPUol6x8KAh+lcQ2TCXq6+NUWl+uvjUNJLJBT1BW7SSn6Ep+jpBY449SjrvWgLdpZblFRJYR12r/hDm22GtebTevRuHvJTJJOgFa8EabEkOpRyHtWKbM1x/HiYG1zbp+sVwMeMpURqQkeVzWy0JQT4NIcQUB3Zvyp1GLF52k+NV93EFSyYOtRhSDt1T3TKjfc8+dWgqME5djVWKxyHrUYUcAHn6XqL7RKhhZkyYGkb+NSa3LaAedQHadUM+Kk70UCXBVSrzrtIG9tqCmiJNOygbBT19BW6BPWtUo2obWgg2AI5UUvJA+W/hV/TwBsbD0og4Kjl7VC3SeeNvKP2fajlaosk+lX3/cyOo8K6TwZJsMx6UA0ygv5ypBTIEJKkxGmu1duNkuLvKSDGsC1rVZ+KcIxKFD4aCpJ6aUr/u7GG3wT6AfU0lpbEplfbYPw1pOpII1OnlWlNnumRIAnyq0o4HiDqhKfFaR9KKey6zq60k/zzQYKKopQBV1jSjoVCBOsyJBFqsDnZ5tsZnMU2kcxf86VXhcFqrEqWRyQfzpHFvsEUZak5gbEcudOKwyiQQRoBc8hXbf8ENFvK6BMfWujiMKb5HjAjVI0pHjl4JaJjHoLjbb0jNHw3L/aTofMUohUfaT60fg+LZWFshtQCxmAUuZWkSAIFiR9KAMZh92D/wDYf0qSxSe9BUkE/iAAbjyNAbeo6cdhv/xz/wDYaMjFYXdlfk5+tVPDIOpAEvV0vE0VePYGjB8Ss0FXEW9mUeZJoejImpHPx64W7TbHFW4uw2fUUUcTYPzYVPkr+lMsEiakRKnqAt3rU6cVgzqwseEfrXC08PVqVp8Qr8qPoyJaK+XZUL2kfWvQVr7ojWq1/uzAqIyvwZGpI+oqx5EqAyuII5girscGrFbBlwjoTyrDilQBlkCY8625hT4+CqArCq3n3P0q3SyWggdMm5HlQkG+prf8KRMT70QMK3NvCjTJaBvKIQonkd6rinB9yp/GoPw1EToarLiSdVH1qMKOHFjr6Cq52pX3ED8f5Gpl5QTqqPOq9x5SXMgQZgkmL0yEnwQqReiJsLjStBvlNbbB5CmKqN+QrK1l6exrKgC9q7RPn7SB/dobvHn/AP3D/dSKj0tTJ/pXKkgCwn0H1rLqZqHn+OvRZxQ9P0qV7F8TcceUHFqVAtPXWqy23nWlEhOYxJ2qx8Lw2HwrmdTilrNhBAHhA/WnhbYO56MtHWhLbJBBEg1vDILiAoKsRpRUNq5inCUDtF2ScTmcYUojUtyZH8t/aqemdD5zXuCwd4qA412ZZfBIhDn3xEE8lDfxqzHkraRVkg3vE8tWjQUZpjmfencfw5xheRxOU7HYjmDuKWCOtWvfgyubXIdlKRUlhsQEgpATCtRGtRaJ5mmmlwRael/rSOLCsiLNwrBtnKuAlUymAdR4U87wNsqJyXJJ1EX86T4ZiJQCVFKhprBG1PMYharqWlAEnMq+YfhG8eVUuzSmqOT2b7swkG3jSquz5np0mrZhlpKAtCiU6SYAPWBeKcfQEpzKtbYzflFAakUJXZ9XnfWBpQF8DUkd5SRVpeWkkp+JCjcRaLaaWqGfYcLigCFK0BJgkRMDWT6USuUUQ6sBl+0PSuEpQIlSvSKfc4W4QpSwpJAnKd/OaSfwmUAqN9QNbeWlOit6lwBdWnaY60JV9K7CRG87W+nWtH4YEyRtG/nanQmuXkGcKtVwJ8q5f4e5lTDaoE6A70VGLA0Jn29KlcLjXAmyoHlTWPHJZBIQ6DHfGm6hFbVxHENkgOLHjep1fEnNzPkKEviQPzNoV5UVT7Da0R6e0uKTADgOuo22rsdr8TulCo8qSx+VSpCAm0QLR4Uiprx+tWKEWI8isnFdsHAIUyhYOonWts9q2Pt4Ij+Ug386rnwjOojqK3kM2A9f6UHhixo5ku5a09psAqymlp8W5rscQ4Wv7aB/MjLVRUBu2THnTGE4WtySlB6Tb3FK+mj5LFlbLa3w7hrnyrZPmBRD2SwavlCf7q/61R8Vgw2SlaAD5D6kzQUYEQVAqEciRt5cqT4bwxvU9i+/8EYfkv8AxVlUbIsaPOf41f8AnWUPh2TWvAZ4qKYCgPCl/h81E+WtNpwyyJKUp9zQFMKm6vDasRbQotF4jzoPDln4yEkGxkzT5THI0skhLqTaZHpNPjfYRxPYuFuZgE5ZFiIt05j9mpVTX4Z/fjVf4LjASgnonS1/6xVoirB2L5Dy9xSvEFobTmWQNk3uoxoBuaziePLYKW051xpISlPVaj5WEm+l5ry/tTjMUhYdcWlf8hkIHLKQIF/1qyONtWUzyqIbtv2ufacS0ycgyhSlbkqJgAjQCPeo3g/FV4sFDpzKMgKN1JVBUkhRvlMEFJJF5FxUXjMYzisvxFKQsCAoAKtM5SkkSmZIIMiTY1eewnAcO2tBzla5KkggDMQm51Ogm3jT8Kyr9TrsVlFGQf3NXPj/AGRSolzDQk3JbJhJ/kP2T+E28KqTLJCylYUlSbEERBGxnSnjKMlaMk8coumSWBxEDvADYTJ9eQp1p9sz/wAlKuq1mDPQEAVDF42AywIFo9SD4VItZCtKLo7veOaQTBuLWkVVOJoxzvYmcd2gVg0oQ2hK5SFKKcspP3ScyhEaQDUSO27ylEJbcUo6D4gt4ZUA1auwqEH4gCc+U2KkXjSxJjn61YV4BGafgqRBnOhSUm3MpIMdLinhOKVONjy1PdOiK7P45xzDodfSG1yUqKhBMGAdJuL1vFugAwU5JPflJ73tFG4lxFtBg4tCBI7pUpalf4VJy1A4/tOz8Q5cUiAAAPguHMrfvJWJvGtIscpPZMjyxSptDC0iJ+KlcfdUk+Ri49aj8dhFFJUtSr7gIUAJiJN/MmlH+0xW4GkoQCXEoLhBKCtZAy5AoqCgTfWMpqdbwCEAl8NrWR8rYKUAbSoQVHpYeNGWOUf1KiKSlwVV7BnMkAKKSJBSjvE7iOnSo7Esn5cqswN9x/Q05xXFtoWpKDOkWT3eki9vOkXsVPzKvtCQZtuQasjFmXJKKbQNpozdJEVJNOwIqPw6iojUjepDD2J06RRaBjl4OlKFLrAN6YU3bSaA42ALCokO2xdxAoJQKOtH4aA4mnSEcgK0JrklAjXrWOJoJTTJFTmMJfQPse9Nt8ZWE5UwkdLVDqFcFUUdIPVaHl4kkzMnrf60BYSbkXO4t9KXz12HKnA0cvuGgc1/4jW6BnrKNsf1fcdQ+T8yk+U0Bx02j1nSsWhsmVKg8pHvSq8U0Pl6ddPeuPXg6zbMW4qTbTmaj1rPxL9KOvGhVkCZ6TFEZ4bP/MdCkJ2TPfUdjBBCE2Nz0gEGatxQd8Fc5Jb2X/gWJSlsZjA3VMRbnXXFe3BMN4dJKzCcxuSfwg/U1RcTjVLhCZiYShMxP1J6mpPA4YNAkkFwiCdcoP2E9TzrXDElzuymeZy42RMqxikIIKiparuK1/uifsiq5xTEZzc2j9zXWKxVtbfX+n9DvULiHSs5Rvr0G9XvZGdysJwrBpWlEJuSSTyGw6W9zU6njIwzqHBcNkQJidonrSLSw2jkY9v2TS+Cwzji8yk5WyJKlpBCwTYIChCiSNRpBnqmkOrweg8I7YrfSpQQEEGBluDzmddqJxviDbiYW2VvAd1TYAVM2BEELHTbaq60UMoASAOSRtUcniSkrCwbgyNDfztUjiTlsiTytR+ZhsY241HxGijNcFVp5xQ0PO5kgIGZUZQQTPIxBkVKq7VrcQW3WmnEHYnL5yJg+AFReA+C258RSnIF0pRlkGTYrULiNwkH61pWOVfpRilOKkqlt+Gi3NnFHKh7iSGTYBCElCz0SlBSSegFbf7NpWnOTjnhupakMJB5q+OAsDrUS3x74ZzYdptskXUofFcVpdTixJNt6i+K8ecd/tnyr8JUY8kJ/IVI4MvlIaXU4W6im39xooZQkThErcJUBncfUCASNlQTbkKSxXEhlKUM4dtYMlxtCpbF+6lSlHM4eYiIsZkpAQpKCpZLKFaqV/aL/C2iZvzJFjrEgoYPCrxLgbZRAF7qhLad1uLNgOarbADRNXuMILU+3uCLnw1zwqJrstgQ44HVWQ0RkT+MQoT4WJO5jYRVg4ji3XXPgsgKMZld4JJ5gEkbRpe9SPBOxbuHbSpl5h4lWdaVg5F2jKCJt5cqax/AmFhS8ThzhlE3dD2dvMbCcxtfmkeNczJk1yt8G5QkoaY7PuVjHcA7hdSrDoyoEtpezlSh82uh6aVBLdmwSB0ExPMcqn8UMMygNqQy7OjrSlFfiQox6GKh8PhEuWS4ErkwlYygjnnmJ6U0XtuY8sd6VX3OGlLTBvB5VMsOBSRp7VDoaUCU5iFD09aeStUAkZDFlRKT40ZIONtDyldRQFa6j1oDjkiHRHJSdD6aVtDYN0rzChRdqs2vWgrRXSwRrXbLLivkbWqfwKM+16nAtWyPWL7VikDTLPXSppvs1ilmfhhAO61BPtr7VJ4bsQ59t5A6ISVf5imo8kV3JHBN8IpruFgDvJvyJP5UmtsixFensdi2E/MtxfQlKR6JE+9SzXA8MI/5KDGmbvf5pofERQ3wMpcujxdtoqMJBUeQBJ9qk8N2cxjnysORzUMn+civYW2wkQkADkAAPatkUkuqfZDw/p0Vy39jyz/gbGfdQP8A5B+lZXqPlW6T4iRd8Dj9/wAngygfuiNK2w2tZyoknoAJG5vYDmTYCm8I3nkgGBYqUZSnwGqldB0m16JicclCSlsZQfmNsyzzURYCdhIHjeqseNy+hZkyKP1OENIZm4Wv732EH8IjvK/EdDpoFVH4nFKWqBKlKPmT1NLOPqcUEIBUo+3U8hU1g8MllNjmWoXUPokwbfyhXlWyMUtkZW295BMDhQyJUZWRc8huEg7c1GBQsRitv18/HUeMi0EZhYjEfrz6g2JJ0MGSbHKQRlqOW4VHKNT7ayTHifVRGtWbRQluRmJxBM11gm47x13/AE/e3iK5UhIhI0Fyo2nmQDoBzNh1mn8LhM112QBMaSOZnQdT53gJVb7kltscs4VTxuSEbndXRO08zp9KmC8lAASAABCQNAPzJO+/mJWcxIFhbbQ9LAajUdTImJAVHv4id/3+n18IFPshUGxOKJNR2JC8wAIAjedd9PKiMHMoctfTTyomIYLiu6bp2zATMbTfSpCSUrYZJtUguE4a4q5fQkdEA/WKc/g2UiHMf5IKUn0STUG5gYsQnn3lC3mTRcJgHF5lNozBPzKTGVPQq2PStSne0X+9lT0xVtftRILXw9Nyt96OZIHqQn61y5xz4Y/9PhkMyLLUMyyNiCfzmoRWGWo942Gg/f1rppxAUAZyiJgkGOQMGKVzlvsOpXtGiz9mey2I4g4VqUcoPfcXJCfwj7yvwCItMSJ9l4H2dawjYbZACdVEpSVLV95SoufYbACvNcJ/tEKGkNs4VIygJCUghHSEpMib+c1odu8e4f8AltgZssAJB+aQmM40MHfask4ZcnOy+poi8cd07f0PUsVmb/sGkKJnN3gg+UC58aKFktgrb1F0qUkx0JNq8hXxzibkQ5lnJpA+dRSnnyJ8BQ04THO/M+oE3tI1WUi6ctoBV4RQXSvu0N6/hMunalQcR8JDZTCheEZIjZYVHTY1RH+HpT877KehcBV/hTP1pDiLDba8jrj7hg3SjMASRlurUhOaQJhVtjVhwHZlhxsOIKilWYCSoESrKJGxSAfM9BWiOCMFu3+DPOLyS3X7kUjGMN/2aVPr2zApbGs9z5lQATe1tompLAcGfxDnxMQ4pOsJFiCRy0ESLeRNlAWLBcHabulCRqdBuQY9EoHkedSKFAEBNzyFzy/fjQlOMV8q+75LYdP2f4XBFYTseuAVPRP3EzPjmIHtUrh+y+HSbpWs7lSso9EZalMM0sC8DpOlNIN4ma5s8km9ma4YYRXAkzgmm7IaQOuUT6m5pgoJopHtWRVXPJaklwAUCPtH61tM9PK360WtipQ1nAVz/fnWzcVysXsffTy5UHOZ5ddPfWpZKGhXBN4oCcR1nxAMdJH5zRUOz9n0g/19qlko3bn7msrPiJ5+1aqAPD8fxC2UAJSLBI0HrqfHfUb1EJQ48vKgTO/7/wBaJhcKt5eUC3tb6mPsjryqcCENJCEXmQSI7x3HeEE//rWkHka6C32XBzKreQLD4dDCYTdRgKUYkq+73vlPJJyG9jS+Ie1k+MztznvWtr3k6gkVy+9InoRubbgA3KR9ptVxtpUc++fpvOml94kQd0qINPtFCu5G33iTAkkmw3kn6yJMWJSFbmmkN/DTAgrVYxcp/DJsmPM9KzBMBtOdQGbQAnMEDrEAGI+ZW2hpplnvZlXVpGpB+6AQAD+GAFCCDNIk5DP5du4PCYYDvLv9qJ5byZmOYCo5JvTD+J8ovyGl5IJgxeZJg5goplNDxGIkza8aEiTokybzsFHvJUMpkGkHHt/S0ciLbCSDG0rGlO3QqVhXXvQbWHMRbTUiBp34tEJ4hRIjnr4bn8vOuxz/AGALDzt6zvMaaTKpPl5fnJHhI1MAryTgbYGUfvTYfvmOtaXwxbkLzwCAY6ZiJ9INDCsygkb3Mchc/wCvWdyTZMMxYLcASkCyOgj5+lvl9atxYpTdIpy9RDFG5fZd2RvC+y6SA68tWTZKbKc10+6jTvb7c6mUuOPgs4RtOVsfKmEoRMjUnvLMG9yb8qheN8aUo5EEkmxI1A08ulegdleFfw+HSg/Oe8v+Y7eQgep3q+c44lUd35KsOKfUvVl2XZfyU9nsw4QS8stmT3fhrWmIsS4kwD6xUhguBMj5HGCoGYSqSDlyxECOfnV7FcPNJWIWhKhyUAoe9Ynlbds6kMUIqkius8FKdEpgRFx9lOVMepPnTeG4fliECwTqUWypKRv1NcccwjDLC3AjIUpOX4alN942TZBA1I2qi8P4ljHULKHjAMFKjJIItBI8d9qa5abvYm2rSXLF8XbS78Ap76SDDYQQmUyJgiwChzgRTrLilE/DbUrIQDGURYgDvEczpOnSq72bxBSAXQTl7qJCVRl+0CQd7C9spqXwSvhuQlSglapJECM0mbCNT0psak/oO4rk804mSXnVQQFrUsaiQpRUPYivQOxLqjhEpSfkUtKu6bEqKonTRQ9apD3BcS2SktOHqhKlj1TNXnsU0+xh1hSFJKnCoJKQTGVImLkab1uypOOzMeHUp7od41iHG2VuBwZkIJSk7kCw151R+DcaxRxLbinVJAcbCxnKQpClhKhkzZVWJmxO+016jxjBDFYRbcqQpadQYIUmCJtpIv0Nea9neMrypCWO6CErczlSwToTNyATJAsByrJUdEttzTLVrSvY9ibWdr0YGf2ajcE93ASdtdj4Gi51HoPLTyrkWbKHAmtxSSlcotWkgzZXXU0NQdI3HU0PELO0+165Qsi9r61sLBtUbIkLOLM39xTDTqSIJ9v0oWIbESpWUTrpE+NKK4i0jQlfgIHqbHymlV2O6okVtk6GfWt/DAF/M/1NV3EdoVJzZbcoGaNNzAPpUcvirivmlX80nSdAIHpT6RLLb/Gtf+4j/F+grKpf8Yv7w9f6VlGgFXdWhtBbbASkRmm9ts4FlIOzggjfeo3EPayb2BzGbbBZ+0n7rmo33rTz0abd4ZbwD9pv7zZ3RtUe674CNIuADy5tq5bGuk2kjl7tm8Q/qZI5zrI3P402v9pPOjcPwos44IESlJ0jZRm2WTYwoDcUPBt5iCUzplSdzqkE7WBAMi8VJJWB3s1/mmNNs8f9q0+dIlfPAz+Xjk7UCTKirNMWjMCBJSJslQ1CR3VDallr27sQBayYOg5hBOm6FdK085tH4YnlcIn/ALkK8qRee85/7s2ttswmRspM0zfgVLydvPczPjqQbGeRICgfxIBrhCSbq19OZPhqT4X7wkVjTZ+ZXjvtqbXHMxCk6wRW3nYtv5DffYX8puLLoV5I34MVcxt+wN/ARI2EzE9ISVEIQJOnT6aQeljoJUmswWDU6cqRCd1e2/T2MGYBqdJbwqIF1H1J61pxYLWqWyMefqFF6Yby8fyEweFRh0lSjKjc+PTnSGJxy3yUt2SNVbJ/8lVy1hXMQfiOEpb2AsVdByHWpDIAMqQEgaACkz9YorRj2LOm/p7k/UzO2LcCDKMU2F/Ig5lKN5XHdKuiTfoa9QRiUESFoI55hH1rw91TjSyDMyb6ZuvWjt8VI1/fpFSMMcorc0ynkg3SVHsrnFGU6uJ8iD9KXV2hYH2ifBNeWo4mk7n1NMJxINwT71dDpsb72Zp9TnT2S/yTP+0DjiXEoabVKfmV/MbAeQk/3qrvC+IhptQUgkLJOdOoMQBe1rnzpHEKLjoSDqY/U+n0qUXhM0oTZCSDEjU2G02k770Eo36aRfqlWt8lr7E4lpTalPKzkqypkBOVKQIiBqSTN9hV2YxGEKcvwxfUzry0IpLheIwzbaGghCkoSEgnKSQkRJzC5p//ANIrVpA8EJHumqpPfhmuC2oXLDR0UfU/1o7OEaI7zhnagK4RgyZSVpP/APR2PQqj2rv/AHQwdHVj++PzFC/djEX214sMLhwlo/2hUjMJOQEEkxrmPP8A0qucA4CoNJcWAlC4IEkExEEpBtpoa6/2hYRTQaShxa5KjM6QAIlJ68qrvCGlWcU64FJWkBHeKVJJAUL8wSOlNOF4uavuUav/AFrmkes4RByBJNo25dKfQFJHPyufSlcJiG0NpKlJTyBImCbQNdK5d4sgXSCfEwk+0+wrjtG+x3MRomDQXXkIutYT0JAv0veoR7ji5ylQSeSRz5k7+BFRbr4USTeTBJNzHXcXoUNZPYrj7SfkClnokx5kj6Un/wARuKAISlCecGdPxCx6RUKp0STKY2I1F+lqXU6AJBIjWP1PnRoFkqvGFRzKKlGftEmLbTtQi6ekDz+ulRycYIEmB/rP7FaXiUmN/flOtMAcW7oNfHlMfpQHVKNielt/GlF4u1oE87+XhQH3VGJUf3vUIOQdh71lRqXOv1rKBCsPO79Z7tgT95H3Vc01pnDZjKrDXoL5VKjorKSOtHbYEkm/PrHzab5DPWKZQsAWIkRJOkxAUfwLTAPIit6SfJzXa4OsuUaCbgid9VN9DPeQaXcxG8/imPL4gHPZaa4ec22+WDra4Qo7KH2V0opZJgSTPgZ28F+xotgo247sPCJtB2B+7uk7aUZhjdVz4anUiDvuUHXUGsYYA7x66D1gHfmg+VdgKWcqBO1piOU7p3E3SaeEGyuc0kcYh+LDW0QZ8CCbnoTcXSab4bwRSu+5ZPLp+Qj6VJ4LhSGhnWQVaydB4daV4lxWQQDlT7mtaxRxrVP8HPl1Esr0Yfu/4GcVj0tjI0BykbeHWg4TBCc7veVqE/r+lL4HDkwancFhCbVz+p6qU9lwdTo+hjj+aW7NpBI/K9PN8OkSR5abVI4LBgAWnrUqhgaRWFHTKPxHgXxDBExp51FO9mYmJr09OAEkxc1p7hpj5THhTqbQrhFnj7vA3E7CKVVgHAoDKZJAnxr1t3h6TsKVe4QI0p1nkmI8CIPC47BMoDKm0BYHfWQCokjdUSDpvXfY/DNrxLinFIcZSJSkpQuVKzATNxAnW5tyqO4zw5QbLfwkzmKs8XiZO0zFtYqCwePS0VZQoExNxtMbda34ZRlF09/qZcu0la29ke2fw2DV/wBNA8ij6RWl8Cw6vkUtH8jk/wCaa8ma7ULToVD0P50612xO5H95J+oBp/TfZ/uFZoe/4PR0dnY+XEu/3gg/5UprauCOfZf9Uf1qjsdsxzT5KI/SpBntaTuf8RqaJ/8AbjLLjff/AEI9sJQ+0264g5QVfNAAWRqDB+zUXh2czhUlZCDpCiEnrbUUDtXxZDuIQ4tBXlQme+LwpRymxqaw/bZDqUNKw6kiyEnNI5QLC9TM28ajRVCMfVcrGcOsITl233H760f+KSBCpjYzYTa/KxqNxq0g2M6QNbeFLqWYuSR1t4/lXJZ0ESD+MBMiAJm3sr6CguYtWxN9zsP1vUcHJ1MxaPO0muFLPOgEddfNr6EX/e+lBexG0z+z+tBKp3oK1JFtzoKhAyAK6UvSuUGKG+8ANahAhd964U5AJJty60inFzqY/ShPvTpp9aNC2SH8QmsqJkfuK1R0k1DSiEjWwCTO4H/TWOqbpI3FKvORO2XWLhObWJ1bVrl1FZWVtMLFSSo8gBrrCdP7yehvTiWMgMxbukaiTcJPNJ1B1TWVlNDkqmxzB8OW6JUYTbcEmNJ6jnrUzCGEWEeGp86ysrqQioQ1Lk4OfJKeXS+LK7xLialm/kNhUclJXc1lZXG6jJJy3Z6DpMMIxVIuXZ3DBTaTvcelWnDYQCKysrJI6MeCQQ2BTbaTArKylGZJYZkASdaYFZWUwpwpsHUA+VLvYRABVpWqygwoqvEMYySpKAVqEzbKPMq/IVUcfwhLhKihKJva59f9KysoxBIjl9n0QYJt1pdfAbSFTNbrKaOSXkR44iD/AA5aZ0MUuGlDS3gaysqyGefkSWGHgabDirFUpNjNz71LYdZS2lIJ7qk6gHRUxr7xWVlTJnm+WNjxRjdIZcxBKzpf0FDzetZWVQXGkqtXaDWVlQhp2DpS7gAIN5vG8daysogYE4y0CfE9KCt+aysooVgQKKhNarKcUNkHM1lZWVAn/9k="
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Car Detailing",
    description:
      "Give your vehicle the care it deserves with our comprehensive car detailing service. We clean and polish every inch of your car, both inside and out, to restore its shine and keep it looking brand new.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="https://cleanimage101.com/wp-content/uploads/2021/06/Exterior.webp"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Roof Waterproofing",
    description:
      "Protect your roof with our high-quality waterproofing services. We apply durable coatings to prevent leaks and water damage, ensuring your home stays dry and secure.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="data:image/jpeg;base64,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"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Heat Proofing",
    description:
      "Keep your spaces cool and comfortable with our effective heat proofing solutions. We apply specialized treatments to reduce heat absorption and improve energy efficiency.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.duraconeng.com%2Fservices-waterproofing-services-in-islamabad-pakistan-construction-chemicals%2Fheat-proofing%2F&psig=AOvVaw1cfwY62qIrY1j9IoUZEmih&ust=1723575396516000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCID91-yQ8IcDFQAAAAAdAAAAABAE"
          alt="Roof Waterproofing"
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
];

export default function BlogCard() {
  // eslint-disable-next-line
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/blog");

        if (response.data && response.data.length > 0) {
          setBlogs(response.data);
        } else {
          alert("No blogs found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <StickyScroll content={content} />
    </div>
  );
}
