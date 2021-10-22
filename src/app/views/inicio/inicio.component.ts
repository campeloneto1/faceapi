import { Component, OnInit } from '@angular/core';
// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
//import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

faceapi.loadSsdMobilenetv1Model('/assets/weights');

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas: HTMLCanvasElement, Image: HTMLImageElement, ImageData: ImageData,createCanvasElement: () => document.createElement('myCanvas'),
createImageElement: () => document.createElement('myImg') } as any);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  input: any;
  detections: any;
  detectionsWithLandmarks: any;
  result: any;
  detectionsWithExpressions : any;

  detectionsForSize : any;
  canvas: any;
  constructor() { }

  ngOnInit(): void {
    //console.log(faceapi.nets);

    this.input = document.getElementById('myImg');
    this.detections = faceapi.detectAllFaces(this.input).withFaceLandmarks();
    //this.detectionsWithLandmarks = faceapi.detectAllFaces(this.input).withFaceLandmarks();
    //this.result = faceapi.detectAllFaces(this.input).withFaceLandmarks().withFaceDescriptors();
    //this.detectionsWithExpressions = faceapi.detectAllFaces(this.input).withFaceExpressions();
    //console.log(this.detections);
    
    this.detectionsForSize = faceapi.resizeResults(this.detections, { width: this.input.width, height: this.input.height });
    this.canvas = document.getElementById('myCanvas');
    this.canvas.width = this.input.width;
    this.canvas.height = this.input.height; 
    //faceapi.draw.drawDetections(this.canvas, this.detectionsForSize);
    //faceapi.draw.drawDetections(this.canvas, this.detectionsForSize);

    
  }

}
