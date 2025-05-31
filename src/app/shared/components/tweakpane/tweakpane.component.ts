import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterName } from '../../models/mbta-filter';

export type TweakControlType = 'slider' | 'number' | 'boolean' | 'text' | 'dropdown';

export interface BaseTweakControl {
  name: FilterName;
  label: string;
  type: TweakControlType;
  value: any;
}

export interface SliderControl extends BaseTweakControl {
  type: 'slider';
  value: number;
  min: number;
  max: number;
  step: number;
}

export interface NumberControl extends BaseTweakControl {
  type: 'number';
  value: number;
}

export interface BooleanControl extends BaseTweakControl {
  type: 'boolean';
  value: boolean;
}

export interface TextControl extends BaseTweakControl {
  type: 'text';
  value: string;
}

export interface DropdownOption {
  label: string;
  value: string | number | undefined | number[] | string[];
}

export interface DropdownControl extends BaseTweakControl {
  type: 'dropdown';
  value: string | number | undefined;
  options: DropdownOption[];
}

export type TweakControl =
  | SliderControl
  | NumberControl
  | BooleanControl
  | TextControl
  | DropdownControl;

@Component({
  selector: 'app-tweakpane',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
    
  ],
  templateUrl: './tweakpane.component.html',
  styleUrls: ['./tweakpane.component.css']
})
export class TweakpaneComponent {
  @Input() title: string = 'Settings';
  @Input() controls: any[] = [];
  @Output() valueChanged: EventEmitter<{name: string, value: any}> = new EventEmitter<{name: string, value: any}>();

  collapsed: boolean = false;

  onValueChange(control: any) {
    this.valueChanged.emit({ name: control.name, value: control.value });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }
}
