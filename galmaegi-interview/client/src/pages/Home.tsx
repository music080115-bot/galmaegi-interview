/**
 * STYLE REMINDER — 여백 있는 극장 프로그램:
 * 제공된 이미지는 한 장의 장면으로 보존하고, 호박빛 진행선과 조용한 메타 정보만으로 읽기 흐름을 안내한다.
 */
import { useEffect, useState } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";

function SeagullMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M10 30C18 16 27 14 34 28C41 14 50 16 57 30C49 26 42 29 35 38C29 29 20 26 10 30Z" fill="currentColor" />
      <path d="M18 43C26 39 38 39 46 43M22 49C28 46 37 46 42 49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const scenes = [
  {
    id: "prologue",
    index: "01",
    shortTitle: "소개",
    image: "/media/intro.webp",
    alt: "갈매기 빛 그리고 사랑을 소개하는 박성아 연출의 메시지 이미지",
  },
  {
    id: "message",
    index: "02",
    shortTitle: "메시지",
    image: "/media/message.webp",
    alt: "갈매기 공연을 통해 전하고 싶은 메시지를 담은 이미지",
  },
  {
    id: "reason",
    index: "03",
    shortTitle: "이유",
    image: "/media/reason.webp",
    alt: "갈매기를 연출하게 된 이유를 설명하는 이미지",
  },
  {
    id: "hardship",
    index: "04",
    shortTitle: "어려움",
    image: "/media/hardship.webp",
    alt: "연출 과정에서 힘들었던 기억을 담은 이미지",
  },
  {
    id: "fun",
    index: "05",
    shortTitle: "즐거움",
    image: "/media/fun.webp",
    alt: "연출 과정에서 재미있었던 기억을 담은 이미지",
  },
  {
    id: "episode",
    index: "06",
    shortTitle: "에피소드",
    image: "/media/episode.webp",
    alt: "함께한 배우들과의 기억나는 에피소드를 담은 이미지",
  },
  {
    id: "audience",
    index: "07",
    shortTitle: "마지막 인사",
    image: "/media/audience.webp",
    alt: "공연을 찾아온 관객에게 전하는 마지막 인사 이미지",
  },
];

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.getElementById("safari-fallback")?.setAttribute("hidden", "");

    const updateReaderPosition = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = pageHeight > 0 ? Math.min(window.scrollY / pageHeight, 1) : 0;
      setScrollProgress(nextProgress);

      const viewportMarker = window.innerHeight * 0.48;
      const currentIndex = scenes.findIndex((scene, index) => {
        const node = document.getElementById(scene.id);
        const nextNode = document.getElementById(scenes[index + 1]?.id ?? "");
        if (!node) return false;
        const top = node.getBoundingClientRect().top;
        const nextTop = nextNode?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        return top <= viewportMarker && nextTop > viewportMarker;
      });

      if (currentIndex >= 0) setActiveScene(currentIndex);
    };

    updateReaderPosition();
    window.addEventListener("scroll", updateReaderPosition, { passive: true });
    window.addEventListener("resize", updateReaderPosition);
    return () => {
      window.removeEventListener("scroll", updateReaderPosition);
      window.removeEventListener("resize", updateReaderPosition);
    };
  }, []);

  const goToScene = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="reader-shell">
      <div className="ambient-grain" aria-hidden="true" />
      <div className="top-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <header className="reader-header">
        <a className="brand-mark" href="#prologue" aria-label="갈매기 인터뷰 처음으로">
          <SeagullMark />
          <span>갈매기</span>
        </a>
        <p className="header-note">獃 그리고 愛 · 연출 박성아</p>
        <p className="scene-counter" aria-live="polite">
          <span>{scenes[activeScene].index}</span> / {String(scenes.length).padStart(2, "0")}
        </p>
      </header>

      <aside className="scene-index" aria-label="인터뷰 장면 목록">
        <div className="index-emblem" aria-hidden="true">
          <SeagullMark />
          <span>THE<br />SEAGULL</span>
        </div>
        <p className="index-kicker">A CONVERSATION<br />IN SEVEN SCENES</p>
        <div className="index-progress" aria-hidden="true"><span style={{ transform: `scaleY(${scrollProgress})` }} /></div>
        <ol className="index-list">
          {scenes.map((scene, index) => (
            <li key={scene.id}>
              <button
                type="button"
                onClick={() => goToScene(scene.id)}
                className={activeScene === index ? "is-current" : ""}
                aria-current={activeScene === index ? "step" : undefined}
              >
                <i aria-hidden="true" />
                <span>{scene.index}</span>
                <em>{scene.shortTitle}</em>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <section className="opening-note" aria-label="읽기 안내">
        <div className="opening-title">
          <SeagullMark />
          <div className="opening-current">갈매기, 獃 그리고 愛</div>
        </div>
        <div>
          <p>일곱 개의 장면, 한 편의 대화.</p>
          <button type="button" onClick={() => goToScene("prologue")}>
            천천히 내려가며 이야기를 만나보세요 <ArrowDown size={15} strokeWidth={1.6} />
          </button>
        </div>
      </section>

      <section className="reader-content" aria-label="갈매기 연출 인터뷰">
        {scenes.map((scene, index) => (
          <article id={scene.id} key={scene.id} className={`scene scene-${scene.id}`}>
            <div className="scene-meta scene-meta-minimal">
              <span>{scene.index}</span>
              <ChevronRight size={17} strokeWidth={1.2} aria-hidden="true" />
            </div>
            <figure className="portrait-frame">
              <img src={scene.image} alt={scene.alt} loading={index === 0 ? "eager" : "lazy"} />
              <figcaption>
                <span>갈매기</span>
                <span>{scene.index} · {String(scenes.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
            {index < scenes.length - 1 && (
              <div className="scene-pause" aria-hidden="true">
                <span />
                <SeagullMark />
                <span />
              </div>
            )}
          </article>
        ))}
      </section>

      <footer className="reader-closing">
        <div className="closing-visual" aria-hidden="true" />
        <div className="closing-copy">
          <SeagullMark />
          <p className="closing-label">CURTAIN CALL</p>
          <p>갈매기, 獃 그리고 愛</p>
        </div>
      </footer>
    </main>
  );
}
