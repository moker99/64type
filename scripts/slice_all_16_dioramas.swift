import Foundation
import AppKit

func cropAndSave(sourcePath: String, rect: CGRect, destPath: String) {
    guard let image = NSImage(contentsOfFile: sourcePath) else {
        print("Error loading \(sourcePath)")
        return
    }
    
    guard let tiffData = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiffData),
          let cgImage = bitmap.cgImage else {
        print("Error getting CGImage from \(sourcePath)")
        return
    }
    
    let imgW = CGFloat(cgImage.width)
    let imgH = CGFloat(cgImage.height)
    
    // Normalized rect (0..1) to pixel rect
    let pixelRect = CGRect(
        x: rect.origin.x * imgW,
        y: (1.0 - rect.origin.y - rect.size.height) * imgH,
        width: rect.size.width * imgW,
        height: rect.size.height * imgH
    )
    
    guard let croppedCG = cgImage.cropping(to: pixelRect) else {
        print("Error cropping rect \(pixelRect)")
        return
    }
    
    let croppedRep = NSBitmapImageRep(cgImage: croppedCG)
    guard let pngData = croppedRep.representation(using: .png, properties: [:]) else {
        print("Error creating PNG data")
        return
    }
    
    try? pngData.write(to: URL(fileURLWithPath: destPath))
    print("Saved: \(destPath)")
}

let baseDir = "/Users/shawn.hong/.gemini/antigravity-ide/brain/c77760eb-01ad-4eb9-aac7-1f0f28660cb8"
let analystsImg = "\(baseDir)/diorama_analysts_4types_1787794304553.jpg"
let diplomatsImg = "\(baseDir)/diorama_diplomats_4types_1787794322939.jpg"
let sentinelsImg = "\(baseDir)/diorama_sentinels_4types_1787794336856.jpg"
let explorersImg = "\(baseDir)/diorama_explorers_4types_1787794354930.jpg"

let outDir = "/Users/shawn.hong/Documents/64type/public/avatars"
let distDir = "/Users/shawn.hong/Documents/64type/dist/avatars"

try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)
try? FileManager.default.createDirectory(atPath: distDir, withIntermediateDirectories: true)

// 1. Analysts (2x2 grid)
// Note: y is from bottom (0) to top (1) in normalized coordinates for our crop logic
// Top-Left: ENTJ (x: 0.05..0.48, y: 0.50..0.92)
// Top-Right: INTJ (x: 0.52..0.95, y: 0.50..0.92)
// Bottom-Left: ENTP (x: 0.05..0.48, y: 0.06..0.48)
// Bottom-Right: INTP (x: 0.52..0.95, y: 0.06..0.48)
cropAndSave(sourcePath: analystsImg, rect: CGRect(x: 0.05, y: 0.50, width: 0.44, height: 0.42), destPath: "\(outDir)/entj.png")
cropAndSave(sourcePath: analystsImg, rect: CGRect(x: 0.52, y: 0.50, width: 0.44, height: 0.42), destPath: "\(outDir)/intj.png")
cropAndSave(sourcePath: analystsImg, rect: CGRect(x: 0.05, y: 0.06, width: 0.44, height: 0.42), destPath: "\(outDir)/entp.png")
cropAndSave(sourcePath: analystsImg, rect: CGRect(x: 0.52, y: 0.06, width: 0.44, height: 0.42), destPath: "\(outDir)/intp.png")

// 2. Diplomats
// ENFJ: Left side (x: 0.03..0.46, y: 0.22..0.92)
// INFJ: Top-Center (x: 0.43..0.68, y: 0.52..0.92)
// ENFP: Top-Right (x: 0.68..0.98, y: 0.52..0.92)
// INFP: Bottom-Right (x: 0.58..0.96, y: 0.08..0.48)
cropAndSave(sourcePath: diplomatsImg, rect: CGRect(x: 0.03, y: 0.22, width: 0.43, height: 0.70), destPath: "\(outDir)/enfj.png")
cropAndSave(sourcePath: diplomatsImg, rect: CGRect(x: 0.42, y: 0.52, width: 0.28, height: 0.40), destPath: "\(outDir)/infj.png")
cropAndSave(sourcePath: diplomatsImg, rect: CGRect(x: 0.68, y: 0.52, width: 0.30, height: 0.40), destPath: "\(outDir)/enfp.png")
cropAndSave(sourcePath: diplomatsImg, rect: CGRect(x: 0.58, y: 0.08, width: 0.38, height: 0.42), destPath: "\(outDir)/infp.png")

// 3. Sentinels (2x2 grid)
// Top-Left: ESTJ (x: 0.08..0.48, y: 0.50..0.92)
// Top-Right: ISTJ (x: 0.52..0.92, y: 0.50..0.92)
// Bottom-Left: ESFJ (x: 0.08..0.48, y: 0.06..0.48)
// Bottom-Right: ISFJ (x: 0.52..0.92, y: 0.06..0.48)
cropAndSave(sourcePath: sentinelsImg, rect: CGRect(x: 0.08, y: 0.50, width: 0.40, height: 0.42), destPath: "\(outDir)/estj.png")
cropAndSave(sourcePath: sentinelsImg, rect: CGRect(x: 0.52, y: 0.50, width: 0.40, height: 0.42), destPath: "\(outDir)/istj.png")
cropAndSave(sourcePath: sentinelsImg, rect: CGRect(x: 0.08, y: 0.06, width: 0.40, height: 0.42), destPath: "\(outDir)/esfj.png")
cropAndSave(sourcePath: sentinelsImg, rect: CGRect(x: 0.52, y: 0.06, width: 0.40, height: 0.42), destPath: "\(outDir)/isfj.png")

// 4. Explorers (1x4 horizontal columns)
// Col 1: ESTP (x: 0.02..0.26, y: 0.12..0.88)
// Col 2: ISTP (x: 0.26..0.50, y: 0.12..0.88)
// Col 3: ESFP (x: 0.50..0.74, y: 0.12..0.88)
// Col 4: ISFP (x: 0.74..0.98, y: 0.12..0.88)
cropAndSave(sourcePath: explorersImg, rect: CGRect(x: 0.02, y: 0.12, width: 0.24, height: 0.76), destPath: "\(outDir)/estp.png")
cropAndSave(sourcePath: explorersImg, rect: CGRect(x: 0.26, y: 0.12, width: 0.24, height: 0.76), destPath: "\(outDir)/istp.png")
cropAndSave(sourcePath: explorersImg, rect: CGRect(x: 0.50, y: 0.12, width: 0.24, height: 0.76), destPath: "\(outDir)/esfp.png")
cropAndSave(sourcePath: explorersImg, rect: CGRect(x: 0.74, y: 0.12, width: 0.24, height: 0.76), destPath: "\(outDir)/isfp.png")

print("All 16 personas cropped successfully!")
