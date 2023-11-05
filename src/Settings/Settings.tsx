import { useCallback, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { styled } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";
import "./Settings.css";

export interface SettingsProps {
  onVolumeChange: (volume: number) => void;
}

export function Settings({ onVolumeChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogChange = (isOpen: boolean) => setIsOpen(isOpen);

  const handleVolumeChange = useCallback(
    (values: number[]) => {
      onVolumeChange(values[0]);
    },
    [onVolumeChange],
  );

  const transition = useTransition(isOpen, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleDialogChange}>
      <Trigger>
        <TriggerShadow />
        <TriggerEdge />
        <TriggerLabel>Settings ⚙</TriggerLabel>
      </Trigger>
      <Dialog.Portal forceMount>
        {transition((style, isOpen) => (
          <>
            {isOpen ? (
              <OverlayBackground style={{ opacity: style.opacity }} />
            ) : null}
            {isOpen ? (
              <Content forceMount style={style}>
                <DialogHeader>
                  <CloseButton>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9574 14.1689L8.59651 6.75098L6.73232 8.59598L14.1313 16.071L6.71338 23.4129L8.5964 25.2769L15.9574 17.8779L23.3943 25.2769L25.2392 23.4129L17.8213 16.071L25.2202 8.59598L23.3752 6.75098L15.9574 14.1689Z"
                        fill="currentColor"
                      />
                    </svg>
                  </CloseButton>
                </DialogHeader>
                <Title>Settings ⚙</Title>
                <form>
                  <div
                    style={{
                      display: "flex",
                      padding: "0 20px",
                      flexWrap: "wrap",
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <Label.Root className="LabelRoot" htmlFor="firstName">
                      Volume
                    </Label.Root>
                    <Slider.Root
                      className="SliderRoot"
                      defaultValue={[50]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    >
                      <Slider.Track className="SliderTrack">
                        <Slider.Range className="SliderRange" />
                      </Slider.Track>
                      <Slider.Thumb
                        className="SliderThumb"
                        aria-label="Volume"
                      />
                    </Slider.Root>
                  </div>
                </form>
              </Content>
            ) : null}
          </>
        ))}
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const TriggerPart = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "16px 0",
});

const TriggerShadow = styled(TriggerPart, {
  background: "hsl(0deg 0% 0% / 0.1)",
  transform: "translateY(2px)",
  transition: "transform 250ms ease-out",
});

const TriggerEdge = styled(TriggerPart, {
  background: `linear-gradient(
      to left,
      hsl(0deg 0% 69%) 0%,
      hsl(0deg 0% 85%) 8%,
      hsl(0deg 0% 85%) 92%,
      hsl(0deg 0% 69%) 100%
    )`,
});

const TriggerLabel = styled("span", {
  display: "block",
  position: "relative",
  borderRadius: "16px 0",
  color: "#569AFF",
  fontSize: "14px",
  padding: "16px 24px",
  background: "#fafafa",
  transform: "translateY(-4px)",
  userSelect: "none",
  transition: "transform 250ms ease-out",
});

const Trigger = styled(Dialog.Trigger, {
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
  background: "transparent",
  position: "absolute",
  padding: 0,
  transition: "filter 250ms ease-out",
  bottom: "25px",
  left: "25px",

  "&:hover": {
    filter: "brightness(110%)",

    [`& ${TriggerLabel}`]: {
      transform: "translateY(-6px)",
    },

    [`& ${TriggerShadow}`]: {
      transform: "translateY(4px)",
    },
  },

  "&:active": {
    [`& ${TriggerLabel}`]: {
      transform: "translateY(-2px)",
      transition: "transform 34ms",
    },

    [`& ${TriggerShadow}`]: {
      transform: "translateY(1px)",
      transition: "transform 34ms",
    },
  },
});

const OverlayBackground = styled(animated(Dialog.Overlay), {
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  pointerEvents: "all",
  position: "fixed",
  inset: 0,
});

const Content = styled(animated(Dialog.Content), {
  position: "absolute",
  width: "50vw",
  height: "60vh",
  backgroundImage: "linear-gradient(330deg,#8e4ec6 0,#3e63dd 100%)",
  borderRadius: "16px 0",
  padding: "24px 24px 32px",
  left: "calc(25vw - 24px)",
});

const DialogHeader = styled("header", {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 16,
});

const CloseButton = styled(Dialog.Close, {
  backgroundColor: "transparent",
  border: "none",
  position: "absolute",
  top: 16,
  right: 16,
  cursor: "pointer",
  color: "#1B1A22",
});

const Title = styled(Dialog.Title, {
  fontSize: 20,
});
