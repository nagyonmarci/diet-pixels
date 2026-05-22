export const en = {
  page: {
    subtitle: "A personal image compression UI mixing Karimz's imgcompress workflow with imgproxy.",
    adminTools: "Admin Tools",
    toast: {
      unsupportedFormat: "Unsupported File Format: {{fileName}}",
      filesRejected: "{{count}} file(s) were rejected due to unsupported file types.",
      noFilesError: "Please drop or select some files first.",
      noFormatError: "Please select an output format first.",
      qualityRangeError: "Quality must be a number between 1 and 100.",
      widthPositiveError: "Width must be a positive number.",
      icoWidthClamped:
        "ICO format is limited to a max width of 256px. Your input has been clamped to 256.",
      targetSizeError: "Please set a positive Max file size (in MB).",
      compressedSuccess_one: "{{count}} Image compressed successfully!",
      compressedSuccess_other: "{{count}} Images compressed successfully!",
      cleanupSuccess:
        "Deletion Complete. Your processed files have been permanently removed. 🧹🧹🧹",
      cleanupFailed: "Force cleanup failed.",
      cleanupError: "🚨 Cleanup failed.",
      compressionCancelled: "Compression cancelled.",
      unexpectedError: "Something went wrong. Please try again.",
      selectionCleared_one: "{{count}} Image selection cleared! 🧹",
      selectionCleared_other: "{{count}} Images selection cleared! 🧹",
    },
  },

  splash: {
    dialogTitle: "Compressing Files",
    dialogDescription: "Please wait while your files are being compressed.",
    tipLabel: "Tip",
    cancelButton: "Cancel",
    steps: {
      starting: "Starting",
      compressing: "Compressing",
      packaging: "Packaging",
    },
    tip: "Keep working—leave this window open and I'll drop your compressed files here when they're ready.",
    messages: [
      "Compressing your files…",
      "Optimizing quality and size.",
      "Re-encoding images, please hold on.",
      "Large uploads can take a moment.",
      "Still working—thanks for your patience.",
      "Cleaning up and preparing your downloads.",
      "Balancing speed with quality right now.",
      "Finishing touches on the output files.",
      "Crunching pixels into smaller packages.",
      "Almost there—writing final bytes.",
      "Checking file integrity.",
      "Wrapping up conversion tasks.",
      "Making sure everything looks good.",
    ],
  },

  form: {
    outputFormat: {
      label: "Output Format",
      placeholder: "Select format",
      hint: "Select an output format to enable conversion.",
      options: {
        auto: "Auto (best modern format)",
        jpeg: "JPEG (smaller file size)",
        png: "PNG (preserves transparency)",
        avif: "AVIF (best compression & quality)",
        ico: "ICO (preserves transparency)",
      },
      tooltip:
        "Auto: imgproxy selects the best modern format (AVIF → WebP → JPEG) based on what it can produce.\nPNG: Preserves transparency (alpha) and is best for images with transparent backgrounds.\nJPEG: Ideal for images without transparency and produces smaller file sizes.\nAVIF: Modern format with superior compression and quality, supports transparency.\nWebP/GIF/TIFF: Additional imgproxy output formats.\nICO: Commonly used for favicons and application icons, supports transparency (alpha). Recommended to use PNG as the source when converting to ICO.",
    },
    compressionMode: {
      label: "{{format}} settings mode",
      byQuality: "Set by Quality",
      bySize: "Set by File Size",
    },
    quality: {
      label: "Quality",
      tooltip:
        "Adjust the quality (100 gives the best quality, lower values reduce file size). Applies to JPEG and AVIF.",
      presets: {
        smaller: "Smaller (60)",
        balanced: "Balanced (75)",
        high: "High (85)",
        max: "Max (100)",
      },
    },
    targetSize: {
      label: "Max file size",
      hint: "It will keep each {{format}} at or below this size by adjusting quality first, then dimensions if needed.",
      tooltip:
        "Set an optional maximum output size (in MB). Applies to JPEG and AVIF output.",
    },
    resizeWidth: {
      label: "Resize Width",
      tooltip:
        "Resizes the image(s) to the desired width while preserving the original aspect ratio.",
    },
    blur: {
      label: "Blur",
      tooltip: "Applies a Gaussian blur. 0 = no blur, higher values increase the blur radius.",
    },
    sharpen: {
      label: "Sharpen",
      tooltip: "Sharpens the image. 0 = no sharpening, higher values increase the effect.",
    },
    dropzone: {
      dragActive: "Drop images here...",
      processing: "Cannot drop files while processing...",
      idle: "Drag & drop images here, or click to select",
    },
    filesList: {
      label: "Files to convert:",
      removeButton: "Remove",
    },
    error: {
      label: "Error:",
      detailsLabel: "Details:",
    },
    buttons: {
      convert: "Start Converting",
      processing: "Processing...",
      clear: "Clear",
    },
  },

  drawer: {
    trigger_one: "🗃️ Show Compressed Image",
    trigger_other: "🗃️ Show Compressed Images",
    title_one: "Compressed Image",
    title_other: "Compressed Images",
    description_one: "Download your compressed Image individually or all at once.",
    description_other: "Download your compressed Images individually or all at once.",
    downloadAll: "Download All as Zip",
    close: "Close",
    downloadingFile: "Downloading {{fileName}}...",
  },

  storage: {
    title: "Storage Management",
    used: "Used:",
    available: "Available:",
    files: "Files",
    clearButton: "Clear Processed Files",
    totalFiles: "Total Files:",
    totalSpace: "Total Space Used:",
    noFiles: "No converted files found.",
    confirmTitle: "Confirm File Deletion",
    confirmDescription:
      "This action will permanently delete all processed files. Please ensure you have downloaded any necessary files before proceeding, as this action cannot be undone.",
    confirmCancel: "Cancel",
    confirmDelete: "Yes, Delete Files",
    fetchError: "Failed to fetch container files.",
    storageError: "Failed to fetch storage info.",
    zipLabel: "(ZIP)",
  },

  statusBanner: {
    warning: "Warning: Backend is currently unavailable.",
  },

  statusFloating: {
    title: "System & Connectivity Status",
    backend: "Container Backend:",
    network: "Network Access:",
    mode: "Mode:",
    backendDown: "Is Down ❌",
    backendUp: "Is Working",
    internetYes: "Has Internet Access",
    internetNo: "No Internet Detected 🚫",
    internetUnknown: "Not Checked",
    checkButton: "Check Internet Connection",
    checking: "Checking...",
    whyTitle: "Why this exists?",
    whyDesc:
      "Verifies container health and network isolation for security. No images or metadata ever leave your machine.",
    backendLastCheck: "Backend Last Check:",
    internetLastCheck: "Internet Last Check:",
  },

  errorModal: {
    title: "Error Occurred",
    notifyDeveloper:
      "You can copy the error details for local troubleshooting.",
    copyError: "Copy Error",
    copied: "Copied!",
    close: "Close",
  },

  formatsDialog: {
    triggerButton: "What can I open?",
    title: "Supported files",
    descriptionStart: "Here is a cheat sheet of what I can open for you. You can pick your result format using the",
    descriptionBold: "Output Format",
    descriptionEnd: "menu on the main screen after you close this.",
    searchLabel: "Search list",
    searchHint: "Just type to find a format",
    searchPlaceholder: "Search (e.g. webp, tiff)...",
    verifiedTitle: "Tested & Working",
    unverifiedTitle: "Other possible formats",
    unverifiedHint: "These haven't been fully tested yet, but they might work!",
    footerText: "DietPixels uses imgproxy for conversion and compression.",
  },

  footer: {
    recommendations: {
      imgcompress: {
        title: "Karimz imgcompress",
        description: "The original workflow inspiration behind this small wrapper.",
      },
      imgproxy: {
        title: "imgproxy",
        description: "The Go image processing engine used for conversion and compression.",
      },
    },
  },

  langSwitcher: {
    ariaLabel: "Switch language",
  },
} as const;

export type Translations = typeof en;
