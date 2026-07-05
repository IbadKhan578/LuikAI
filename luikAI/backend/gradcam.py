import torch
import torch.nn.functional as F

class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self._register()

    def _register(self):
        self.target_layer.register_forward_hook(self._forward)
        self.target_layer.register_backward_hook(self._backward)

    def _forward(self, module, input, output):
        self.activations = output.detach()

    def _backward(self, module, grad_in, grad_out):
        self.gradients = grad_out[0].detach()

    def generate(self, x, class_idx=None):
        out = self.model(x)
        if class_idx is None:
            class_idx = out.argmax(dim=1).item()

        self.model.zero_grad()
        out[0, class_idx].backward()

        weights = self.gradients.mean(dim=(2,3), keepdim=True)
        cam = (weights * self.activations).sum(dim=1)
        cam = F.relu(cam)

        cam = cam.squeeze().cpu().numpy()
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        return cam