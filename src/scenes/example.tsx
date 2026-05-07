import { Txt, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, waitFor } from "@motion-canvas/core";
import { addBackground } from "../lib/bg";
import { makeCounter } from "../lib/counter";
import { slide } from "../lib/slide";
import { setupSlide } from "../lib/slide-layout";
import { colors, fonts, sizes } from "../lib/theme";

export default makeScene2D(function* (view) {
  addBackground(view);
  const { showTitle } = setupSlide(view, { title: "vibeslides" });

  const subtitle = createRef<Txt>();
  view.add(
    <Txt
      ref={subtitle}
      y={-40}
      fontSize={sizes.bodySize}
      fontFamily={fonts.sans}
      fill={colors.textMuted}
      opacity={0}
      text={"Motion Canvas slide framework"}
    />,
  );

  yield* slide(
    "title",
    `Welcome slide. Press → for next, F for fullscreen, N to open notes.`,
    "intro",
  );
  yield* all(showTitle(), subtitle().opacity(1, 0.5));

  const { node, handle } = makeCounter(0, 0, "%", {
    y: 80,
    fontSize: 96,
    fontFamily: fonts.mono,
    fill: colors.active,
    fontWeight: 700,
  });
  view.add(node);

  yield* slide(
    "counter",
    `Counter animates from 0 to 100. Demonstrates the counter helper.`,
    "demo",
  );
  yield* handle.countTo(100, 1.5);

  yield* slide(
    "outro",
    `End of demo. Replace this scene with your own under src/scenes.`,
  );
  yield* waitFor(0.2);
});
