import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Cpu, Zap, Save, User, Bell, Monitor, HardDrive, LayoutGrid, LogIn, LogOut, Shield, Lock, Download, AlertTriangle, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- DATASET LENGKAP (FULL) ---
const INITIAL_COMPONENTS = [
  { category: 'CPU', name: 'AMD Ryzen 3 3200G (APU)', tdp: 65, socket: 'AM4', price: 962000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 3400G (APU)', tdp: 65, socket: 'AM4', price: 1100000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 4500', tdp: 65, socket: 'AM4', price: 1145000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 5500', tdp: 65, socket: 'AM4', price: 1440000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 5600G (APU)', tdp: 65, socket: 'AM4', price: 2187000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 5600X', tdp: 65, socket: 'AM4', price: 1685000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 7 5700G (APU)', tdp: 65, socket: 'AM4', price: 2975000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 7 5800X', tdp: 105, socket: 'AM4', price: 2449000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 9 5900X', tdp: 105, socket: 'AM4', price: 4990001, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 9 5950X', tdp: 105, socket: 'AM4', price: 3845000, ramType: 'DDR4' },
  { category: 'CPU', name: 'AMD Ryzen 5 7600', tdp: 65, socket: 'AM5', price: 3290000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 5 7600X', tdp: 105, socket: 'AM5', price: 3495081, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 7 7700', tdp: 65, socket: 'AM5', price: 5695000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 7 7700X', tdp: 105, socket: 'AM5', price: 5590000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 7 7800X3D', tdp: 120, socket: 'AM5', price: 5605000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 9 7900X', tdp: 170, socket: 'AM5', price: 6489000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 9 7950X', tdp: 170, socket: 'AM5', price: 9850000, ramType: 'DDR5' },
  { category: 'CPU', name: 'AMD Ryzen 9 7950X3D', tdp: 170, socket: 'AM5', price: 9599001, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-10600K', tdp: 125, socket: 'LGA1200', price: 2170000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i5-11600K', tdp: 125, socket: 'LGA1200', price: 3842000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i7-11700K', tdp: 125, socket: 'LGA1200', price: 5305000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i7-11700KF', tdp: 125, socket: 'LGA1200', price: 4640000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i9-10900K', tdp: 125, socket: 'LGA1200', price: 3899000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i9-10900KF', tdp: 125, socket: 'LGA1200', price: 7078000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i9-11900K', tdp: 125, socket: 'LGA1200', price: 3975000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i9-11900KF', tdp: 125, socket: 'LGA1200', price: 3730000, ramType: 'DDR4' },
  { category: 'CPU', name: 'Intel Core i5-12400', tdp: 65, socket: 'LGA1700', price: 2440000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-12600K', tdp: 125, socket: 'LGA1700', price: 2993000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-13400', tdp: 65, socket: 'LGA1700', price: 3185000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-13600K', tdp: 125, socket: 'LGA1700', price: 4625000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-13600KF', tdp: 125, socket: 'LGA1700', price: 5199000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i5-14600K', tdp: 125, socket: 'LGA1700', price: 3590000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i7-12700K', tdp: 125, socket: 'LGA1700', price: 4000000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i7-12700KF', tdp: 125, socket: 'LGA1700', price: 4619000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i7-13700K', tdp: 125, socket: 'LGA1700', price: 6688000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i7-14700K', tdp: 125, socket: 'LGA1700', price: 6160000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-12900K', tdp: 125, socket: 'LGA1700', price: 7065000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-12900KF', tdp: 125, socket: 'LGA1700', price: 6377000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-12900KS', tdp: 150, socket: 'LGA1700', price: 5590000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-13900K', tdp: 125, socket: 'LGA1700', price: 7499001, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-13900KS', tdp: 150, socket: 'LGA1700', price: 12095000, ramType: 'DDR5' },
  { category: 'CPU', name: 'Intel Core i9-14900K', tdp: 125, socket: 'LGA1700', price: 7515000, ramType: 'DDR5' },
  { category: 'GPU', name: 'NVIDIA RTX 3050', tdp: 130, price: 3300000 },
  { category: 'GPU', name: 'NVIDIA RTX 3060', tdp: 170, price: 4200000 },
  { category: 'GPU', name: 'NVIDIA RTX 3060 Ti', tdp: 200, price: 5300000 },
  { category: 'GPU', name: 'NVIDIA RTX 3070', tdp: 220, price: 6900000 },
  { category: 'GPU', name: 'NVIDIA RTX 3070 Ti', tdp: 290, price: 8200000 },
  { category: 'GPU', name: 'NVIDIA RTX 3080', tdp: 320, price: 10400000 },
  { category: 'GPU', name: 'NVIDIA RTX 3080 Ti', tdp: 350, price: 12900000 },
  { category: 'GPU', name: 'NVIDIA RTX 3090', tdp: 350, price: 18500000 },
  { category: 'GPU', name: 'NVIDIA RTX 3090 Ti', tdp: 450, price: 23500000 },
  { category: 'GPU', name: 'NVIDIA RTX 4060', tdp: 115, price: 4300000 },
  { category: 'GPU', name: 'NVIDIA RTX 4060 Ti', tdp: 160, price: 6100000 },
  { category: 'GPU', name: 'NVIDIA RTX 4070', tdp: 200, price: 8200000 },
  { category: 'GPU', name: 'NVIDIA RTX 4070 Super', tdp: 220, price: 9300000 },
  { category: 'GPU', name: 'NVIDIA RTX 4070 Ti', tdp: 285, price: 11800000 },
  { category: 'GPU', name: 'NVIDIA RTX 4070 Ti Super', tdp: 295, price: 12900000 },
  { category: 'GPU', name: 'NVIDIA RTX 4080', tdp: 320, price: 18500000 },
  { category: 'GPU', name: 'NVIDIA RTX 4080 Super', tdp: 320, price: 20900000 },
  { category: 'GPU', name: 'NVIDIA RTX 4090', tdp: 450, price: 32500000 },
  { category: 'GPU', name: 'AMD RX 6600', tdp: 132, price: 2600000 },
  { category: 'GPU', name: 'AMD RX 6600 XT', tdp: 160, price: 3400000 },
  { category: 'GPU', name: 'AMD RX 6650 XT', tdp: 176, price: 4200000 },
  { category: 'GPU', name: 'AMD RX 6700 XT', tdp: 230, price: 5200000 },
  { category: 'GPU', name: 'AMD RX 6750 XT', tdp: 250, price: 6200000 },
  { category: 'GPU', name: 'AMD RX 6800', tdp: 250, price: 6800000 },
  { category: 'GPU', name: 'AMD RX 6800 XT', tdp: 300, price: 7800000 },
  { category: 'GPU', name: 'AMD RX 6900 XT', tdp: 300, price: 9800000 },
  { category: 'GPU', name: 'AMD RX 7600', tdp: 165, price: 3800000 },
  { category: 'GPU', name: 'AMD RX 7600 XT', tdp: 190, price: 4500000 },
  { category: 'GPU', name: 'AMD RX 7700 XT', tdp: 245, price: 6500000 },
  { category: 'GPU', name: 'AMD RX 7800 XT', tdp: 263, price: 8200000 },
  { category: 'GPU', name: 'AMD RX 7900 GRE', tdp: 260, price: 9500000 },
  { category: 'GPU', name: 'AMD RX 7900 XT', tdp: 315, price: 12500000 },
  { category: 'GPU', name: 'AMD RX 7900 XTX', tdp: 355, price: 11040000 },
  { category: 'Motherboard', name: 'ASRock B450M Pro4', socket: 'AM4', ramType: 'DDR4', price: 950000 },
  { category: 'Motherboard', name: 'ASRock Fatal1ty B450 Gaming-ITX/ac', socket: 'AM4', ramType: 'DDR4', price: 1350000 },
  { category: 'Motherboard', name: 'ASUS TUF B450-PLUS Gaming', socket: 'AM4', ramType: 'DDR4', price: 1100000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix B450-I Gaming', socket: 'AM4', ramType: 'DDR4', price: 1700000 },
  { category: 'Motherboard', name: 'MSI B450 Tomahawk Max', socket: 'AM4', ramType: 'DDR4', price: 1250000 },
  { category: 'Motherboard', name: 'MSI B450M Mortar Max', socket: 'AM4', ramType: 'DDR4', price: 1150000 },
  { category: 'Motherboard', name: 'ASRock X570 Taichi', socket: 'AM4', ramType: 'DDR4', price: 3100000 },
  { category: 'Motherboard', name: 'ASRock X570 Phantom Gaming-ITX/TB3', socket: 'AM4', ramType: 'DDR4', price: 2800000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix X570-E Gaming', socket: 'AM4', ramType: 'DDR4', price: 3600000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix X570-I Gaming', socket: 'AM4', ramType: 'DDR4', price: 3250000 },
  { category: 'Motherboard', name: 'MSI MEG X570 UNIFY', socket: 'AM4', ramType: 'DDR4', price: 3400000 },
  { category: 'Motherboard', name: 'MSI MPG X570 Gaming Edge WiFi', socket: 'AM4', ramType: 'DDR4', price: 2500000 },
  { category: 'Motherboard', name: 'ASRock B650M Pro RS', socket: 'AM5', ramType: 'DDR5', price: 2250000 },
  { category: 'Motherboard', name: 'ASUS TUF Gaming B650-Plus WiFi', socket: 'AM5', ramType: 'DDR5', price: 3100000 },
  { category: 'Motherboard', name: 'MSI B650 Tomahawk WiFi', socket: 'AM5', ramType: 'DDR5', price: 3400000 },
  { category: 'Motherboard', name: 'MSI B650I Edge WiFi', socket: 'AM5', ramType: 'DDR5', price: 4100000 },
  { category: 'Motherboard', name: 'ASRock B650E PG-ITX WiFi', socket: 'AM5', ramType: 'DDR5', price: 4500000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix B650E-I Gaming WiFi', socket: 'AM5', ramType: 'DDR5', price: 5200000 },
  { category: 'Motherboard', name: 'MSI PRO X670-P WiFi', socket: 'AM5', ramType: 'DDR5', price: 4300000 },
  { category: 'Motherboard', name: 'ASRock X670E Taichi', socket: 'AM5', ramType: 'DDR5', price: 8100000 },
  { category: 'Motherboard', name: 'ASRock X670E Steel Legend', socket: 'AM5', ramType: 'DDR5', price: 5100000 },
  { category: 'Motherboard', name: 'ASUS ROG Crosshair X670E Hero', socket: 'AM5', ramType: 'DDR5', price: 10200000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix X670E-I Gaming WiFi', socket: 'AM5', ramType: 'DDR5', price: 7300000 },
  { category: 'Motherboard', name: 'MSI MEG X670E ACE', socket: 'AM5', ramType: 'DDR5', price: 12500000 },
  { category: 'Motherboard', name: 'ASRock B460M Steel Legend', socket: 'LGA1200', ramType: 'DDR4', price: 850000 },
  { category: 'Motherboard', name: 'ASUS TUF Gaming B460-Plus', socket: 'LGA1200', ramType: 'DDR4', price: 1000000 },
  { category: 'Motherboard', name: 'MSI B460 Tomahawk', socket: 'LGA1200', ramType: 'DDR4', price: 1200000 },
  { category: 'Motherboard', name: 'ASRock Z590 Taichi', socket: 'LGA1200', ramType: 'DDR4', price: 3700000 },
  { category: 'Motherboard', name: 'ASUS ROG Strix Z590-E Gaming', socket: 'LGA1200', ramType: 'DDR4', price: 3900000 },
  { category: 'Motherboard', name: 'MSI Z590-A PRO', socket: 'LGA1200', ramType: 'DDR4', price: 2100000 },
  { category: 'Motherboard', name: 'ASRock B660M Pro RS', socket: 'LGA1700', ramType: 'DDR5', price: 1750000 },
  { category: 'Motherboard', name: 'ASUS TUF B660-PLUS WiFi', socket: 'LGA1700', ramType: 'DDR5', price: 2700000 },
  { category: 'Motherboard', name: 'MSI B660 Tomahawk WiFi', socket: 'LGA1700', ramType: 'DDR5', price: 3000000 },
  { category: 'Motherboard', name: 'ASRock Z790 Taichi', socket: 'LGA1700', ramType: 'DDR5', price: 8800000 },
  { category: 'Motherboard', name: 'ASUS ROG Maximus Z790 Hero', socket: 'LGA1700', ramType: 'DDR5', price: 10700000 },
  { category: 'Motherboard', name: 'MSI Z790 Carbon WiFi', socket: 'LGA1700', ramType: 'DDR5', price: 7500000 },
  { category: 'RAM', name: 'Corsair Vengeance LPX 16GB (2x8GB) 3200MHz', type: 'DDR4', price: 750000 },
  { category: 'RAM', name: 'G.Skill Trident Z Neo 32GB (2x16GB) 3600MHz', type: 'DDR4', price: 1850000 },
  { category: 'RAM', name: 'Kingston Fury Beast 8GB (1x8GB) 3200MHz', type: 'DDR4', price: 450000 },
  { category: 'RAM', name: 'TeamGroup T-Force Delta RGB 16GB (2x8GB) 3600MHz', type: 'DDR4', price: 950000 },
  { category: 'RAM', name: 'Corsair Dominator Platinum RGB 32GB (2x16GB) 3600MHz', type: 'DDR4', price: 2500000 },
  { category: 'RAM', name: 'ADATA XPG Spectrix D50 16GB (2x8GB) 3200MHz', type: 'DDR4', price: 850000 },
  { category: 'RAM', name: 'Kingston Fury Beast 16GB (1x16GB) 4800MHz', type: 'DDR5', price: 1100000 },
  { category: 'RAM', name: 'Kingston Fury Beast 32GB (2x16GB) 5200MHz', type: 'DDR5', price: 2300000 },
  { category: 'RAM', name: 'Corsair Vengeance 32GB (2x16GB) 5200MHz', type: 'DDR5', price: 2450000 },
  { category: 'RAM', name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) 6000MHz', type: 'DDR5', price: 3200000 },
  { category: 'RAM', name: 'TeamGroup T-Force Delta RGB 32GB (2x16GB) 6000MHz', type: 'DDR5', price: 2900000 },
  { category: 'RAM', name: 'ADATA XPG Lancer RGB 32GB (2x16GB) 6000MHz', type: 'DDR5', price: 2750000 },
  { category: 'RAM', name: 'Corsair Vengeance LPX 8GB (1x8GB) 2666MHz', type: 'DDR4', price: 400000 },
  { category: 'RAM', name: 'Crucial Ballistix 16GB (2x8GB) 3200MHz', type: 'DDR4', price: 800000 },
  { category: 'RAM', name: 'Patriot Viper Steel 16GB (2x8GB) 4400MHz', type: 'DDR4', price: 1500000 },
  { category: 'RAM', name: 'G.Skill Ripjaws V 16GB (2x8GB) 3200MHz', type: 'DDR4', price: 780000 },
  { category: 'RAM', name: 'TeamGroup Elite 8GB (1x8GB) 4800MHz', type: 'DDR5', price: 650000 },
  { category: 'RAM', name: 'Corsair Dominator Platinum RGB 32GB (2x16GB) 5600MHz', type: 'DDR5', price: 3500000 },
  { category: 'RAM', name: 'G.Skill Trident Z5 Neo 32GB (2x16GB) 6000MHz', type: 'DDR5', price: 3300000 },
  { category: 'RAM', name: 'Kingston Fury Renegade 32GB (2x16GB) 6400MHz', type: 'DDR5', price: 3600000 },
  { category: 'PSU', name: 'ASUS ROG Strix 750W', wattage: 750, price: 2335000 },
  { category: 'PSU', name: 'ASUS ROG Loki SFX-L 850W', wattage: 850, price: 2799000 },
  { category: 'PSU', name: 'Cooler Master V850 SFX Gold', wattage: 850, price: 2193000 },
  { category: 'PSU', name: 'Cooler Master V750 Gold V2', wattage: 750, price: 1685000 },
  { category: 'PSU', name: 'Cooler Master MWE Bronze 550', wattage: 550, price: 694000 },
  { category: 'PSU', name: 'Corsair CX450M', wattage: 450, price: 497321 },
  { category: 'PSU', name: 'Corsair RM750x', wattage: 750, price: 2255000 },
  { category: 'PSU', name: 'Corsair SF600', wattage: 600, price: 1050000 },
  { category: 'PSU', name: 'Corsair HX1000', wattage: 1000, price: 1300000 },
  { category: 'PSU', name: 'EVGA 600 BR', wattage: 600, price: 475000 },
  { category: 'PSU', name: 'FSP Hydro G Pro 850', wattage: 850, price: 1935000 },
  { category: 'PSU', name: 'NZXT C850', wattage: 850, price: 1969500 },
  { category: 'PSU', name: 'Seasonic Prime PX-850', wattage: 850, price: 2000000 },
  { category: 'PSU', name: 'Seasonic Focus GX-750', wattage: 750, price: 2065000 },
  { category: 'PSU', name: 'Seasonic S12III 500', wattage: 500, price: 670000 },
  { category: 'PSU', name: 'SilverStone SX650-G', wattage: 650, price: 1650000 },
  { category: 'PSU', name: 'be quiet! Pure Power 11 500W', wattage: 500, price: 808000 },
  { category: 'PSU', name: 'be quiet! Straight Power 11 750W', wattage: 750, price: 1850000 },
  { category: 'Storage', name: 'Samsung 870 EVO', capacity: 500, price: 699000 },
  { category: 'Storage', name: 'Samsung 870 QVO', capacity: 1000, price: 765000 },
  { category: 'Storage', name: 'Samsung 970 EVO Plus', capacity: 500, price: 1420000 },
  { category: 'Storage', name: 'Samsung 980 PRO', capacity: 1000, price: 1578000 },
  { category: 'Storage', name: 'Kingston A400', capacity: 240, price: 345345 },
  { category: 'Storage', name: 'Kingston A400 M.2', capacity: 240, price: 594000 },
  { category: 'Storage', name: 'WD Black SN850X', capacity: 1000, price: 1659000 },
  { category: 'Storage', name: 'WD Blue 3D NAND', capacity: 1000, price: 1050000 },
  { category: 'Storage', name: 'WD Blue SA510', capacity: 1000, price: 528000 },
  { category: 'Storage', name: 'WD Blue SN570', capacity: 500, price: 861000 },
  { category: 'Storage', name: 'Seagate FireCuda 530', capacity: 1000, price: 1888000 },
  { category: 'Storage', name: 'Kingston KC3000', capacity: 1000, price: 1587000 },
  { category: 'Storage', name: 'TeamGroup L5 LITE 3D M.2', capacity: 480, price: 480000 },
  { category: 'Storage', name: 'TeamGroup MP34', capacity: 512, price: 615000 },
  { category: 'Storage', name: 'Corsair MP600 PRO LPX', capacity: 2000, price: 1740255 },
  { category: 'Storage', name: 'Crucial MX500', capacity: 500, price: 470000 },
  { category: 'Storage', name: 'Crucial MX500 M.2', capacity: 500, price: 470000 },
  { category: 'Storage', name: 'Crucial P5 Plus', capacity: 1000, price: 1720000 },
  { category: 'Storage', name: 'ADATA SU800 M.2', capacity: 512, price: 450000 },
  { category: 'Storage', name: 'ADATA XPG S70 Blade', capacity: 1000, price: 1300000 },
  { category: 'Case', name: 'GAMEMAX Infinity Mini', formFactor: 'M-ATX', price: 390000 },
  { category: 'Case', name: 'Raptor Glass Flow A Series', formFactor: 'M-ATX / ITX', price: 289000 },
  { category: 'Case', name: 'GAMEMAX Infinity Mini White/Black', formFactor: 'M-ATX', price: 390000 },
  { category: 'Case', name: 'NZXT H9 Flow', formFactor: 'ATX', price: 2500000 },
  { category: 'Case', name: 'Fractal Design Terra', formFactor: 'ITX', price: 3090000 },
  { category: 'Case', name: 'ASUS ROG Hyperion GR701', formFactor: 'Full Tower', price: 7077500 },
  { category: 'Case', name: 'Lian Li Lancool 216', formFactor: 'ATX', price: 1750000 },
  { category: 'Case', name: 'Cooler Master MasterBox NR200P', formFactor: 'Mini-ITX', price: 1500000 },
  { category: 'Case', name: 'Deepcool CH370', formFactor: 'Micro-ATX', price: 890000 },
  { category: 'Case', name: 'Montech Air 100 ARGB', formFactor: 'Micro-ATX', price: 750000 },
  { category: 'Case', name: 'Thermaltake Versa H18', formFactor: 'Micro-ATX', price: 650000 },
  { category: 'Case', name: 'NZXT H5 Flow', formFactor: 'ATX', price: 1600000 },
  { category: 'Case', name: 'Corsair 4000D Airflow', formFactor: 'ATX', price: 1800000 },
  { category: 'Case', name: 'Fractal Design Pop Air', formFactor: 'ATX', price: 1550000 },
  { category: 'Case', name: 'Cooler Master TD500 Mesh V2', formFactor: 'ATX', price: 2100000 },
  { category: 'Case', name: 'Montech Sky Two', formFactor: 'ATX', price: 1750000 },
  { category: 'Case', name: 'Lian Li O11 Dynamic', formFactor: 'ATX', price: 2700000 },
  { category: 'Case', name: 'Tecware Nexus M', formFactor: 'Micro-ATX', price: 550000 },
  { category: 'Case', name: 'Deepcool CK560', formFactor: 'ATX', price: 1900000 },
  { category: 'Case', name: 'DarkFlash DLX23 Mesh', formFactor: 'ATX', price: 1300000 },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('rigvibes_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [components, setComponents] = useState(() => {
    const savedComponents = localStorage.getItem('rigvibes_components');
    return savedComponents ? JSON.parse(savedComponents) : INITIAL_COMPONENTS;
  });

  const [savedBuilds, setSavedBuilds] = useState(() => {
    const saved = localStorage.getItem('rigvibes_builds');
    return saved ? JSON.parse(saved) : [];
  });

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [view, setView] = useState(currentUser ? 'home' : 'login'); 
  
  const [filters, setFilters] = useState({
    budget: 'Semua',
    power: 'Semua',
    purpose: 'Gaming',
    brand: 'Semua'
  });

  const [currentBuild, setCurrentBuild] = useState({
    name: 'My Custom Build',
    parts: {}
  });

  const [newComp, setNewComp] = useState({ category: 'CPU', name: '', price: '', socket: '' });

  useEffect(() => {
    localStorage.setItem('rigvibes_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('rigvibes_components', JSON.stringify(components));
  }, [components]);

  useEffect(() => {
    localStorage.setItem('rigvibes_builds', JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username.toLowerCase() === 'admin' && loginForm.password === 'admin123') {
        setCurrentUser({ name: 'Administrator', role: 'admin' });
        setView('home');
    } else if (loginForm.username && loginForm.password) {
        setCurrentUser({ name: loginForm.username, role: 'user' });
        setView('home');
    } else {
        alert("Username atau Password salah/kosong!");
    }
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setLoginForm({ username: '', password: '' });
      setView('login');
      localStorage.removeItem('rigvibes_user');
  };

  // --- LOGIKA BOTTLENECK (HEURISTIC) ---
  const getComponentTier = (name, category) => {
    const n = name.toLowerCase();
    if (category === 'CPU') {
        if (n.includes('i9') || n.includes('ryzen 9')) return 90;
        if (n.includes('i7') || n.includes('ryzen 7')) return 75;
        if (n.includes('i5') || n.includes('ryzen 5')) return 55;
        if (n.includes('i3') || n.includes('ryzen 3')) return 30;
        return 40; 
    }
    if (category === 'GPU') {
        if (n.includes('4090') || n.includes('7900 xtx')) return 100;
        if (n.includes('4080') || n.includes('7900 xt')) return 90;
        if (n.includes('4070') || n.includes('7800') || n.includes('3090') || n.includes('6900')) return 75;
        if (n.includes('4060') || n.includes('7700') || n.includes('3070') || n.includes('6800')) return 60;
        if (n.includes('3060') || n.includes('6700') || n.includes('6600')) return 45;
        if (n.includes('3050') || n.includes('6500')) return 30;
        return 20;
    }
    return 0;
  };

  const calculateBottleneck = () => {
    const cpu = currentBuild.parts.CPU;
    const gpu = currentBuild.parts.GPU;
    if (!cpu || !gpu) return null;

    const cpuScore = getComponentTier(cpu.name, 'CPU');
    const gpuScore = getComponentTier(gpu.name, 'GPU');
    
    const diff = gpuScore - cpuScore;

    if (diff > 20) return { status: 'critical', msg: '⚠️ CPU Bottleneck: Prosesor terlalu lemah untuk VGA ini!', color: 'text-red-500' };
    if (diff > 10) return { status: 'warning', msg: '⚠️ Sedikit Bottleneck: CPU agak kewalahan.', color: 'text-yellow-500' };
    if (cpuScore - gpuScore > 30) return { status: 'info', msg: 'ℹ️ GPU Bottleneck: Prosesor terlalu kuat (mubazir).', color: 'text-blue-400' };
    return { status: 'good', msg: '✅ Kombinasi Seimbang (Great Match!)', color: 'text-[#39ff14]' };
  };

  const calculateTotal = () => {
    let price = 0;
    let totalTdp = 0; 
    Object.values(currentBuild.parts).forEach(part => {
      if(part) {
        price += part.price || 0;
        if (part.tdp) totalTdp += part.tdp;
      }
    });
    const baseLoad = price > 0 ? 60 : 0;
    return { price, tdp: totalTdp + baseLoad }; 
  };

  const saveBuild = () => {
    const { price, tdp } = calculateTotal();
    if (price === 0) {
        alert("Rakitan masih kosong!");
        return;
    }
    
    const existingIndex = savedBuilds.findIndex(b => b.id === currentBuild.id); 
    const buildData = {
      id: currentBuild.id || Date.now(),
      name: currentBuild.name,
      totalPrice: price,
      totalWattage: tdp,
      parts: currentBuild.parts
    };

    if (existingIndex >= 0) {
        const updatedBuilds = [...savedBuilds];
        updatedBuilds[existingIndex] = buildData;
        setSavedBuilds(updatedBuilds);
        alert("Build berhasil diperbarui!");
    } else {
        setSavedBuilds([...savedBuilds, buildData]);
        alert("Build baru berhasil disimpan!");
    }
    setView('saved');
  };

  const handleEditBuild = (build) => {
    setCurrentBuild({
        id: build.id, 
        name: build.name,
        parts: build.parts
    });
    setView('builder');
  };

  const generatePDF = async () => {
    const element = document.getElementById('print-area');
    if(!element) return;
    
    try {
      const canvas = await html2canvas(element, {
          scale: 2, 
          backgroundColor: '#1a1a2e' 
      });
      
      const imgData = canvas.toDataURL('image/png');
      // SETTING PDF LANDSCAPE ('l' = landscape)
      const pdf = new jsPDF('l', 'mm', 'a4'); 
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`RigVibes-Build-${currentBuild.name}.pdf`);
    } catch (error) {
      console.error("Gagal print PDF", error);
      alert("Gagal generate PDF");
    }
  };

  const generateRecommendation = () => {
    let newParts = {};
    
    // 1. BUDGET & POWER RULES
    const budgetRules = {
        'Low': { CPU: 2500000, GPU: 3500000, Motherboard: 1500000, RAM: 800000, Storage: 800000, PSU: 750000, Case: 500000 },
        'Mid': { CPU: 5000000, GPU: 8500000, Motherboard: 3500000, RAM: 2000000, Storage: 2000000, PSU: 2000000, Case: 2000000 },
        'High': { CPU: 999999999, GPU: 999999999, Motherboard: 999999999, RAM: 999999999, Storage: 999999999, PSU: 999999999, Case: 999999999 }
    };
    const powerRules = {
        'Hemat': { cpuMaxTdp: 65, gpuMaxTdp: 130 },
        'Performa': { cpuMaxTdp: 9999, gpuMaxTdp: 9999 },
        'Semua': { cpuMaxTdp: 9999, gpuMaxTdp: 9999 }
    };

    const currentBudgetLimit = filters.budget === 'Semua' ? budgetRules['High'] : budgetRules[filters.budget];
    const currentPowerLimit = filters.power === 'Semua' ? powerRules['Semua'] : powerRules[filters.power];

    // 2. HELPER PENCARI KANDIDAT
    const getCandidates = (category, additionalFilter = () => true) => {
        let candidates = components.filter(c => {
            if (c.category !== category) return false;
            // Cek Budget Maksimal
            if (c.price > currentBudgetLimit[category]) return false;
            // Cek TDP
            if (category === 'CPU' && c.tdp > currentPowerLimit.cpuMaxTdp) return false;
            if (category === 'GPU' && c.tdp > currentPowerLimit.gpuMaxTdp) return false;
            return additionalFilter(c);
        });

        if (category === 'CPU' && filters.brand !== 'Semua') candidates = candidates.filter(c => c.name.includes(filters.brand));
        
        // --- LOGIKA SORTING CERDAS BERDASARKAN BUDGET ---
        if (filters.budget === 'High') {
            // Jika HIGH: Urutkan dari TERMAHAL -> TERMURAH, lalu ambil top 40%
            // Ini mencegah sistem mengambil komponen murah saat budget High
            candidates.sort((a, b) => b.price - a.price);
            const cutOff = Math.max(2, Math.floor(candidates.length * 0.4));
            candidates = candidates.slice(0, cutOff);
        } else if (filters.budget === 'Low') {
            // Jika LOW: Urutkan dari TERMURAH -> TERMAHAL
            candidates.sort((a, b) => a.price - b.price);
            const cutOff = Math.max(2, Math.floor(candidates.length * 0.6));
            candidates = candidates.slice(0, cutOff);
        }
        
        // Fallback jika kosong
        if (candidates.length === 0) { 
            const all = components.filter(c => c.category === category && additionalFilter(c));
            all.sort((a, b) => a.price - b.price); // Ambil yg murah aja biar aman
            return all.slice(0, 3);
        }
        return candidates;
    };

    // 3. EKSEKUSI PEMILIHAN (RANDOM DARI KANDIDAT YG SUDAH DISARING)
    const cpuCandidates = getCandidates('CPU');
    if (cpuCandidates.length > 0) {
        const selectedCPU = cpuCandidates[Math.floor(Math.random() * cpuCandidates.length)];
        newParts.CPU = selectedCPU;
        const moboCandidates = getCandidates('Motherboard', (m) => m.socket === selectedCPU.socket);
        if (moboCandidates.length > 0) newParts.Motherboard = moboCandidates[Math.floor(Math.random() * moboCandidates.length)];
        const ramCandidates = getCandidates('RAM', (r) => r.type === selectedCPU.ramType);
        if (ramCandidates.length > 0) newParts.RAM = ramCandidates[Math.floor(Math.random() * ramCandidates.length)];
    }

    const gpuCandidates = getCandidates('GPU');
    if (gpuCandidates.length > 0) newParts.GPU = gpuCandidates[Math.floor(Math.random() * gpuCandidates.length)];
    const storageCandidates = getCandidates('Storage');
    if (storageCandidates.length > 0) newParts.Storage = storageCandidates[Math.floor(Math.random() * storageCandidates.length)];
    const psuCandidates = getCandidates('PSU');
    if (psuCandidates.length > 0) newParts.PSU = psuCandidates[Math.floor(Math.random() * psuCandidates.length)];
    const caseCandidates = getCandidates('Case');
    if (caseCandidates.length > 0) newParts.Case = caseCandidates[Math.floor(Math.random() * caseCandidates.length)];

    setCurrentBuild({ id: null, name: `Rekomendasi ${filters.budget} - ${filters.power}`, parts: newParts });
    setView('builder');
  };

  const handleSelectPart = (category, item) => {
    setCurrentBuild(prev => ({
      ...prev,
      parts: { ...prev.parts, [category]: item }
    }));
  };

  const getCompatibleParts = (category) => {
    let filtered = components.filter(c => c.category === category);
    if (category === 'Motherboard' && currentBuild.parts.CPU) filtered = filtered.filter(m => m.socket === currentBuild.parts.CPU.socket);
    if (category === 'RAM' && currentBuild.parts.CPU) filtered = filtered.filter(r => r.type === currentBuild.parts.CPU.ramType);
    return filtered;
  };

  const renderLogin = () => (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-4">
          <div className="bg-[#252540] p-8 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md">
              <div className="flex justify-center mb-6">
                  <img src="/rigvibes-logo.png" alt="RigVibes Logo" className="w-20 h-20 shadow-[0_0_20px_#39ff14] rounded-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-center mb-8">Masuk untuk mulai merakit PC impianmu</p>
              <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                      <label className="text-gray-300 text-sm mb-1 block">Username</label>
                      <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-500 w-5 h-5"/>
                          <input type="text" className="w-full bg-[#1a1a2e] text-white pl-10 p-3 rounded border border-gray-600 focus:border-[#39ff14] outline-none" placeholder="Masukkan username..." value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} />
                      </div>
                  </div>
                  <div>
                      <label className="text-gray-300 text-sm mb-1 block">Password</label>
                      <div className="relative">
                          <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5"/>
                          <input type="password" className="w-full bg-[#1a1a2e] text-white pl-10 p-3 rounded border border-gray-600 focus:border-[#39ff14] outline-none" placeholder="Masukkan password..." value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
                      </div>
                  </div>
                  <button className="w-full bg-[#39ff14] text-black font-bold py-3 rounded hover:bg-green-400 transition mt-4">Masuk</button>
              </form>
          </div>
      </div>
  );

  const renderNavbar = () => (
    <nav className="flex justify-between items-center p-6 bg-[#1a1a2e] text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <img src="/rigvibes-logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
        <h1 className="text-xl font-bold tracking-wider hidden md:block">RIGVIBES</h1>
      </div>
      {currentUser && (
          <div className="flex gap-4 md:gap-8 text-sm font-medium text-gray-300">
            <button onClick={() => setView('home')} className={`hover:text-[#39ff14] ${view === 'home' ? 'text-[#39ff14]' : ''}`}>Home</button>
            <button onClick={() => setView('saved')} className={`hover:text-[#39ff14] ${view === 'saved' ? 'text-[#39ff14]' : ''}`}>Saved</button>
            {currentUser.role === 'admin' && (
                <button onClick={() => setView('admin')} className={`flex items-center gap-1 hover:text-[#39ff14] ${view === 'admin' ? 'text-[#39ff14]' : ''}`}><Shield size={14}/> Admin</button>
            )}
          </div>
      )}
      <div className="flex gap-4 items-center">
        {currentUser ? (
            <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                    <p className="text-sm text-white font-bold">{currentUser.name}</p>
                    <p className="text-xs text-[#39ff14] uppercase">{currentUser.role}</p>
                </div>
                <button onClick={handleLogout} className="bg-red-500/20 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition" title="Keluar"><LogOut size={18} /></button>
            </div>
        ) : (
            <button onClick={() => setView('login')} className="text-[#39ff14] flex items-center gap-2 font-bold"><LogIn size={18}/> Login</button>
        )}
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="p-8 bg-[#1a1a2e] min-h-screen text-white">
      <div className="relative bg-gradient-to-r from-[#1a1a2e] to-[#252540] p-10 rounded-3xl border border-gray-700 overflow-hidden mb-12">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">BUILD PC IMPIANMU! <br/> <span className="text-[#39ff14]">SEMAUMU!</span></h1>
          <p className="text-gray-400 mb-6">Halo, <b>{currentUser?.name}</b>! Mulai cari rekomendasi di sini.</p>
          <button onClick={() => { setCurrentBuild({ id: null, name: 'New Build', parts: {}}); setView('builder'); }} className="bg-[#39ff14] text-black font-bold py-3 px-8 rounded-full hover:bg-green-400 transition shadow-[0_0_15px_rgba(57,255,20,0.5)]">Mulai Manual</button>
        </div>
      </div>
      <div className="bg-[#252540] p-6 rounded-xl mb-8 border border-gray-700">
        <div className="flex items-center gap-2 mb-4"><div className="bg-[#39ff14] text-black px-3 py-1 rounded font-bold text-xs">FILTER REKOMENDASI</div></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Budget</label>
            <select className="bg-[#1a1a2e] text-white p-2 rounded border border-gray-600 focus:border-[#39ff14] outline-none text-sm" value={filters.budget} onChange={(e) => setFilters({...filters, budget: e.target.value})}>
                <option value="Semua">Semua Budget</option>
                <option value="Low">Low (Under 10 Jt)</option>
                <option value="Mid">Mid (10 - 25 Jt)</option>
                <option value="High">High (25 Jt +)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Konsumsi Daya</label>
            <select className="bg-[#1a1a2e] text-white p-2 rounded border border-gray-600 focus:border-[#39ff14] outline-none text-sm" value={filters.power} onChange={(e) => setFilters({...filters, power: e.target.value})}>
                <option value="Semua">Semua Daya</option>
                <option value="Hemat">Hemat Daya</option>
                <option value="Performa">Performa Tinggi</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Tujuan</label>
            <select className="bg-[#1a1a2e] text-white p-2 rounded border border-gray-600 focus:border-[#39ff14] outline-none text-sm" value={filters.purpose} onChange={(e) => setFilters({...filters, purpose: e.target.value})}>
                <option value="Gaming">Gaming</option>
                <option value="Office">Office / Kerja</option>
                <option value="Editing">Editing / Render</option>
            </select>
          </div>
           <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Brand Processor</label>
            <select className="bg-[#1a1a2e] text-white p-2 rounded border border-gray-600 focus:border-[#39ff14] outline-none text-sm" value={filters.brand} onChange={(e) => setFilters({...filters, brand: e.target.value})}>
                <option value="Semua">Semua Brand</option>
                <option value="AMD">AMD</option>
                <option value="Intel">Intel</option>
            </select>
          </div>
        </div>
        <button onClick={generateRecommendation} className="w-full mt-6 bg-gradient-to-r from-[#39ff14] to-green-600 text-black font-bold py-3 rounded-lg hover:opacity-90 transition active:scale-95">Cari Rekomendasi & Rakit Otomatis</button>
      </div>
    </div>
  );

  const renderBuilder = () => {
    const { price, tdp } = calculateTotal();
    const bottleneck = calculateBottleneck(); 
    const partsList = [
      { id: 'CPU', icon: <Cpu />, label: 'Processor' },
      { id: 'Motherboard', icon: <LayoutGrid />, label: 'Motherboard' }, 
      { id: 'GPU', icon: <Monitor />, label: 'VGA / GPU' },
      { id: 'RAM', icon: <HardDrive />, label: 'Memory (RAM)' },
      { id: 'Storage', icon: <Save />, label: 'Storage (SSD/HDD)' },
      { id: 'PSU', icon: <Zap />, label: 'Power Supply' },
      { id: 'Case', icon: <LayoutGrid />, label: 'Casing' },
    ];

    return (
      <div className="p-8 bg-[#1a1a2e] min-h-screen text-white">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">EDIT <span className="text-[#39ff14]">BUILD</span></h2>
            <div className="h-1 bg-[#39ff14] w-1/3 shadow-[0_0_10px_#39ff14]"></div>
         </div>

         {/* --- WRAPPER ID UNTUK PRINT PDF --- */}
         <div id="print-area" className="bg-[#252540] p-8 rounded-2xl border border-gray-700 mb-6">
            
            {/* Header Khusus PDF */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-600 pb-4">
                 <div className="flex items-center gap-3">
                    <img src="/rigvibes-logo.png" alt="Logo" className="w-12 h-12 rounded-lg" />
                    <div>
                        <h1 className="text-2xl font-bold tracking-wider text-white">RIGVIBES</h1>
                        <p className="text-xs text-gray-400">Simulasi Rakit PC Indonesia</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <h3 className="text-xl font-bold text-[#39ff14]">{currentBuild.name}</h3>
                    <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
                 </div>
            </div>

            {/* Summary Total */}
            <div className="grid grid-cols-3 gap-4 mb-6">
               <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600">
                 <p className="text-[#39ff14] font-bold text-sm mb-1">Est Total :</p>
                 <p className="text-2xl font-bold text-white">{formatRupiah(price)}</p>
               </div>
               <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600">
                 <p className="text-[#39ff14] font-bold text-sm mb-1">Est Daya (TDP) :</p>
                 <p className="text-2xl font-bold text-white">{tdp}W</p>
               </div>
               {/* --- BOTTLENECK STATUS --- */}
               <div className="bg-[#1a1a2e] p-4 rounded-lg border border-gray-600 flex items-center justify-center text-center">
                 {bottleneck ? (
                    <div>
                        <p className={`font-bold text-sm ${bottleneck.color}`}>{bottleneck.msg}</p>
                    </div>
                 ) : <span className="text-gray-500 text-sm">Pilih CPU & GPU untuk cek bottleneck</span>}
               </div>
            </div>

            {/* List Komponen untuk PDF */}
            <div className="space-y-3">
                {partsList.map((part) => (
                    <div key={part.id} className="flex justify-between items-center p-3 bg-[#1a1a2e] rounded border border-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm w-24">{part.label}</span>
                            <div>
                                <span className="text-white font-medium block">
                                    {currentBuild.parts[part.id] ? currentBuild.parts[part.id].name : '-'}
                                </span>
                                {/* DETAIL SPESIFIK */}
                                {currentBuild.parts[part.id] && (
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                                        {part.id === 'CPU' && `Socket: ${currentBuild.parts[part.id].socket} | TDP: ${currentBuild.parts[part.id].tdp}W`}
                                        {part.id === 'Motherboard' && `Socket: ${currentBuild.parts[part.id].socket} | ${currentBuild.parts[part.id].ramType}`}
                                        {part.id === 'RAM' && `${currentBuild.parts[part.id].type}`}
                                        {part.id === 'Storage' && `${currentBuild.parts[part.id].capacity} GB`}
                                        {part.id === 'PSU' && `${currentBuild.parts[part.id].wattage} W`}
                                        {part.id === 'GPU' && `TDP: ${currentBuild.parts[part.id].tdp}W`}
                                    </span>
                                )}
                            </div>
                        </div>
                        <span className="text-[#39ff14] text-sm">
                             {currentBuild.parts[part.id] ? formatRupiah(currentBuild.parts[part.id].price) : '-'}
                        </span>
                    </div>
                ))}
            </div>
         </div>
         {/* --- WRAPPER ID UNTUK PRINT PDF --- */}


         {/* MENU EDITOR (SELECT COMPONENT) */}
         <div className="bg-[#202033] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-gray-400 mb-4 font-bold uppercase text-sm tracking-wider border-b border-gray-700 pb-2">Pilih Komponen</h3>
            {partsList.map((part) => (
              <div key={part.id} className="mb-4 border-b border-gray-700 pb-4 last:border-0">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 bg-[#2a2a40] rounded-lg text-white border border-gray-600">{part.icon}</div>
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 block">{part.label}</label>
                      {currentBuild.parts[part.id] ? (
                        <div className="mt-1">
                           <div className="flex justify-between items-center">
                                <span className="font-bold text-white">{currentBuild.parts[part.id].name}</span>
                                <span className="text-[#39ff14] text-sm">{formatRupiah(currentBuild.parts[part.id].price)}</span>
                           </div>
                           {/* DETAIL SPESIFIK DI UI EDITOR */}
                           <span className="text-xs text-gray-500 block mt-0.5">
                                {part.id === 'CPU' && `Socket: ${currentBuild.parts[part.id].socket} | TDP: ${currentBuild.parts[part.id].tdp}W`}
                                {part.id === 'Motherboard' && `Socket: ${currentBuild.parts[part.id].socket} | ${currentBuild.parts[part.id].ramType}`}
                                {part.id === 'RAM' && `${currentBuild.parts[part.id].type}`}
                                {part.id === 'Storage' && `${currentBuild.parts[part.id].capacity} GB`}
                                {part.id === 'PSU' && `${currentBuild.parts[part.id].wattage} W`}
                                {part.id === 'GPU' && `TDP: ${currentBuild.parts[part.id].tdp}W`}
                           </span>
                        </div>
                      ) : (<span className="text-gray-500 text-sm italic">Belum dipilih</span>)}
                    </div>
                 </div>
                 <select className="w-full bg-[#151520] text-white p-3 rounded border border-gray-700 focus:border-[#39ff14] outline-none mt-2" onChange={(e) => {
                       const selected = components.find(c => c.name === e.target.value);
                       handleSelectPart(part.id, selected);
                    }} value={currentBuild.parts[part.id]?.name || ''}>
                    <option value="">Pilih {part.label}...</option>
                    {getCompatibleParts(part.id).map((comp, idx) => (
                       <option key={idx} value={comp.name}>{comp.name} - {formatRupiah(comp.price)}</option>
                    ))}
                 </select>
              </div>
            ))}
            <div className="mt-8 border-t border-gray-600 pt-6 grid grid-cols-2 gap-4">
               <button onClick={saveBuild} className="w-full bg-[#39ff14] hover:bg-green-400 text-black font-bold py-4 rounded-full text-lg transition shadow-[0_0_20px_rgba(57,255,20,0.3)] flex items-center justify-center gap-2">
                  <Save size={20}/> Simpan Build
               </button>
               <button onClick={generatePDF} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-full text-lg transition shadow-lg flex items-center justify-center gap-2">
                  <Download size={20}/> Download PDF
               </button>
            </div>
         </div>
      </div>
    );
  };

  const renderSaved = () => (
    <div className="p-8 bg-[#1a1a2e] min-h-screen text-white">
       <div className="flex justify-between items-center mb-12">
          <div className="h-1 bg-[#39ff14] flex-1 shadow-[0_0_10px_#39ff14] rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold whitespace-nowrap">BUILD <span className="text-[#39ff14]">TERSIMPAN</span></h2>
          <div className="h-1 bg-[#39ff14] flex-1 shadow-[0_0_10px_#39ff14] rounded-full ml-4"></div>
       </div>
       {savedBuilds.length === 0 ? (
         <div className="text-center text-gray-500 py-20">
            <p className="text-xl">Belum ada rakitan tersimpan.</p>
            <button onClick={() => setView('builder')} className="text-[#39ff14] mt-4 underline">Buat Rakitan Baru</button>
         </div>
       ) : (
           <div className="grid gap-6">
              {savedBuilds.map((build) => (
                 <div key={build.id} className="bg-[#252540] p-6 rounded-2xl border border-gray-700 relative overflow-hidden group hover:border-[#39ff14] transition-all">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                       <h3 className="text-xl font-bold text-[#39ff14] flex items-center gap-2">{build.name} <Monitor size={16}/></h3>
                       <div className="flex gap-2">
                          <div onClick={() => handleEditBuild(build)} className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#39ff14] hover:text-black transition" title="Edit Build Ini">
                             <Edit2 className="w-4 h-4" />
                          </div>
                          <div onClick={() => setSavedBuilds(savedBuilds.filter(b => b.id !== build.id))} className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white transition" title="Hapus">
                             <Trash2 className="w-4 h-4" />
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 relative z-10 mb-6">
                       <div><p className="text-[#39ff14] text-xs font-bold">Est Total :</p><p className="text-xl font-bold">{formatRupiah(build.totalPrice)}</p></div>
                       <div><p className="text-[#39ff14] text-xs font-bold">Daya :</p><p className="text-xl font-bold">{build.totalWattage}W</p></div>
                    </div>
                 </div>
              ))}
           </div>
       )}
    </div>
  );

  const renderAdmin = () => {
    if (currentUser?.role !== 'admin') return <div className="p-20 text-center text-red-500 font-bold">AKSES DITOLAK</div>
    return (
      <div className="p-8 bg-[#1a1a2e] min-h-screen text-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#39ff14] flex items-center justify-center gap-2"><Shield/> Admin Panel</h2>
        <div className="bg-[#202033] p-8 rounded-xl max-w-2xl mx-auto border border-gray-700 shadow-lg">
           <div className="space-y-4">
              <div><label className="block text-sm mb-1">Kategori</label><select className="w-full p-3 bg-[#151520] border border-gray-600 rounded text-white" value={newComp.category} onChange={e => setNewComp({...newComp, category: e.target.value})}>{['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case'].map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="block text-sm mb-1">Nama Komponen</label><input type="text" className="w-full p-3 bg-[#151520] border border-gray-600 rounded text-white" placeholder="Contoh: RTX 4090" value={newComp.name} onChange={e => setNewComp({...newComp, name: e.target.value})}/></div>
              <div><label className="block text-sm mb-1">Harga (IDR)</label><input type="number" className="w-full p-3 bg-[#151520] border border-gray-600 rounded text-white" placeholder="15000000" value={newComp.price} onChange={e => setNewComp({...newComp, price: e.target.value})}/></div>
              {['CPU', 'Motherboard'].includes(newComp.category) && (
                 <div><label className="block text-sm mb-1">Socket</label><input type="text" className="w-full p-3 bg-[#151520] border border-gray-600 rounded text-white" placeholder="Contoh: AM5" value={newComp.socket} onChange={e => setNewComp({...newComp, socket: e.target.value})}/></div>
              )}
              <button onClick={() => { if(newComp.name && newComp.price) { setComponents([...components, { ...newComp, price: parseInt(newComp.price) }]); alert('Berhasil!'); setNewComp({ category: 'CPU', name: '', price: '', socket: '' }); }}} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-4">+ Tambah Komponen</button>
              
              <div className="pt-8 mt-8 border-t border-gray-600">
                  <p className="text-xs text-gray-400 mb-2 text-center">Jika list komponen tidak muncul, tekan tombol ini:</p>
                  <button onClick={() => {
                        if(window.confirm("Yakin reset data? Ini akan memuat ulang Dataset Lengkap dan menghapus komponen tambahan manual.")) {
                           localStorage.removeItem('rigvibes_components'); 
                           setComponents(INITIAL_COMPONENTS); 
                           alert("Dataset berhasil di-refresh! Silakan cek menu Builder.");
                        }
                    }} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2"><Zap size={18}/> Reset ke Default Dataset Lengkap</button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] min-h-screen font-sans">
      {view === 'login' ? renderLogin() : (
          <>
            {renderNavbar()}
            {view === 'home' && renderHome()}
            {view === 'builder' && renderBuilder()}
            {view === 'saved' && renderSaved()}
            {view === 'admin' && renderAdmin()}
          </>
      )}
    </div>
  );
};

export default App;
