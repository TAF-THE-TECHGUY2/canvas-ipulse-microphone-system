class Microphone {
  constructor() {
    this.initialized = false;
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = new Uint8Array(2048); 
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.audioInput = this.audioContext.createMediaStreamSource(stream);
        this.audioInput.connect(this.analyser);
        this.initialized = true;
      })
      .catch((error) => {
        console.error("Error accessing the microphone:", error);
        alert(
          "Error accessing the microphone. Please check your browser settings and try again."
        );
      });
  }

  getSamples() {
    if (!this.initialized) return null; 
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
    return normSamples;
  }

  getVolume() {
    if (!this.initialized) return 0; 
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1);
    let sum = 0;
    for (let i = 0; i < normSamples.length; i++) {
      sum += normSamples[i] * normSamples[i];
    }
    let volume = Math.sqrt(sum / normSamples.length);
    return volume;
  }
}

const microphone = new Microphone();
