import cv2
import base64
import numpy as np

def overlay_cam(image, cam):
    cam = cv2.resize(cam, (image.shape[1], image.shape[0]))
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(image, 0.6, heatmap, 0.4, 0)
    return overlay

def encode_image(img):
    _, buffer = cv2.imencode(".jpg", img)
    return base64.b64encode(buffer).decode("utf-8")


import cv2
import numpy as np


def cam_to_color(cam: np.ndarray, target_size: tuple) -> np.ndarray:
    """
    Converts a raw Grad-CAM activation map into a standalone colorized
    heatmap image (no blending with the original photo).

    Args:
        cam: 2D numpy array of Grad-CAM values. Any positive range is fine —
             it gets normalized to 0-1 here, so you don't need to normalize
             it yourself before calling this.
        target_size: (width, height) tuple to resize the heatmap to, so it
             matches the original uploaded image's dimensions. Use
             image.size if `image` is a PIL Image, or (w, h) from img_np.shape
             reversed if it's a numpy array.

    Returns:
        RGB numpy array (H, W, 3), uint8 — ready to pass into encode_image().
    """
    # Normalize to 0-1 defensively, in case the caller passes a raw,
    # un-normalized CAM.
    cam = cam - cam.min()
    if cam.max() > 0:
        cam = cam / cam.max()

    # Resize to match the original image dimensions.
    cam_resized = cv2.resize(cam, target_size)

    # Apply a color map (JET: blue = low activation, red = high activation).
    heatmap_bgr = cv2.applyColorMap(np.uint8(255 * cam_resized), cv2.COLORMAP_JET)

    # OpenCV uses BGR by default — convert to RGB so it displays correctly
    # once base64-encoded and rendered in an <img> tag on the frontend.
    heatmap_rgb = cv2.cvtColor(heatmap_bgr, cv2.COLOR_BGR2RGB)

    return heatmap_rgb