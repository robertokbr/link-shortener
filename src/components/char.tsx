import Image from "next/image";

export function Char() {
  return (
    <div className="char">
      <div className="char-container">
        <div className="char-box">
          <a href="https://blog.robkbr.com/">
            <Image width={300} height={300} src="/char.png" alt="char" />
          </a>
        </div>
      </div>
    </div>
  );
}
