import type { TranslationSchema } from "../types";

export const hu: TranslationSchema = {
  page: {
    subtitle: "Saját célú képtömörítő UI Karimz imgcompress munkafolyamatából és az imgproxy-ból keverve.",
    adminTools: "Adminisztrációs Eszközök",
    toast: {
      unsupportedFormat: "Nem támogatott fájlformátum: {{fileName}}",
      filesRejected: "{{count}} fájl el lett utasítva nem támogatott formátum miatt.",
      noFilesError: "Kérlek, először adj hozzá fájlokat.",
      noFormatError: "Kérlek, először válassz kimeneti formátumot.",
      qualityRangeError: "A minőségnek 1 és 100 közötti számnak kell lennie.",
      widthPositiveError: "A szélességnek pozitív számnak kell lennie.",
      icoWidthClamped:
        "Az ICO formátum maximum 256px szélességet támogat. A bevitt érték 256-ra lett korlátozva.",
      targetSizeError: "Kérlek, adj meg egy pozitív maximális fájlméretet (MB-ban).",
      compressedSuccess_one: "{{count}} kép sikeresen tömörítve!",
      compressedSuccess_other: "{{count}} kép sikeresen tömörítve!",
      cleanupSuccess:
        "Törlés kész. A feldolgozott fájlok véglegesen eltávolítva. 🧹🧹🧹",
      cleanupFailed: "A kényszer-törlés sikertelen.",
      cleanupError: "🚨 A törlés sikertelen.",
      compressionCancelled: "A tömörítés megszakítva.",
      unexpectedError: "Váratlan hiba. Kérlek, próbáld újra.",
      selectionCleared_one: "{{count}} kép kijelölése törölve! 🧹",
      selectionCleared_other: "{{count}} kép kijelölése törölve! 🧹",
    },
  },

  splash: {
    dialogTitle: "Fájlok tömörítése",
    dialogDescription: "Kérlek, várj, amíg a fájlok tömörítése befejeződik.",
    tipLabel: "Tipp",
    cancelButton: "Mégse",
    steps: {
      starting: "Indítás",
      compressing: "Tömörítés",
      packaging: "Csomagolás",
    },
    tip: "Dolgozhatsz tovább – hagyd nyitva ezt az ablakot, és ide teszem a tömörített fájlokat, amint elkészültek.",
    messages: [
      "Fájlok tömörítése folyamatban…",
      "Minőség és méret optimalizálása.",
      "Képek újrakódolása, kérlek, várj.",
      "Nagy feltöltések eltarthatnak egy ideig.",
      "Még dolgozom – köszönöm a türelmed.",
      "Takarítás és letöltések előkészítése.",
      "Sebesség és minőség egyensúlyának megteremtése.",
      "Utolsó simítások a kimeneti fájlokon.",
      "Pixelek kisebb csomagokba tömörítése.",
      "Majdnem kész – utolsó bájtok írása.",
      "Fájlintegritás ellenőrzése.",
      "Konverziós feladatok befejezése.",
      "Minden rendben van-e – ellenőrzés.",
    ],
  },

  form: {
    outputFormat: {
      label: "Kimeneti formátum",
      placeholder: "Formátum kiválasztása",
      hint: "Válassz kimeneti formátumot a konverzió engedélyezéséhez.",
      options: {
        auto: "Auto (legjobb modern formátum)",
        jpeg: "JPEG (kisebb fájlméret)",
        png: "PNG (átlátszóság megőrzése)",
        avif: "AVIF (legjobb tömörítés & minőség)",
        ico: "ICO (átlátszóság megőrzése)",
      },
      tooltip:
        "Auto: az imgproxy a legjobb modern formátumot választja (AVIF → WebP → JPEG) a lehetőségek alapján.\nPNG: Megőrzi az átlátszóságot (alfa), legjobb átlátszó hátterű képekhez.\nJPEG: Átlátszóság nélküli képekhez ideális, kisebb fájlméretet eredményez.\nAVIF: Modern formátum kiváló tömörítéssel és minőséggel, támogatja az átlátszóságot.\nWebP/GIF/TIFF: További imgproxy kimeneti formátumok.\nICO: Favicon és alkalmazásikonok esetén használatos, támogatja az átlátszóságot (alfa). ICO konverzióhoz PNG forrás ajánlott.",
    },
    compressionMode: {
      label: "{{format}} beállítási mód",
      byQuality: "Minőség alapján",
      bySize: "Fájlméret alapján",
    },
    quality: {
      label: "Minőség",
      tooltip:
        "A minőség beállítása (100 a legjobb minőség, alacsonyabb értékek csökkentik a fájlméretet). JPEG és AVIF esetén érvényes.",
      presets: {
        smaller: "Kisebb (60)",
        balanced: "Kiegyensúlyozott (75)",
        high: "Magas (85)",
        max: "Maximum (100)",
      },
    },
    targetSize: {
      label: "Maximális fájlméret",
      hint: "Minden {{format}} fájlt a megadott határ alatt tart: először minőséget, szükség esetén képméretet csökkent.",
      tooltip:
        "Opcionális maximális kimeneti méret (MB-ban). JPEG és AVIF kimenethez érvényes.",
    },
    resizeWidth: {
      label: "Szélesség átméretezése",
      tooltip:
        "A kép(ek) átméretezése a kívánt szélességre, az eredeti képarány megtartásával.",
    },
    blur: {
      label: "Elmosás",
      tooltip: "Gauss-elmosást alkalmaz. 0 = nincs elmosás, magasabb érték erősebb hatást jelent.",
    },
    sharpen: {
      label: "Élesítés",
      tooltip: "Élesíti a képet. 0 = nincs élesítés, magasabb érték erősebb hatást jelent.",
    },
    dropzone: {
      dragActive: "Ejtsd ide a képeket...",
      processing: "Feldolgozás közben nem lehet fájlokat húzni...",
      idle: "Húzd ide a képeket, vagy kattints a kiválasztáshoz",
    },
    filesList: {
      label: "Konvertálandó fájlok:",
      removeButton: "Eltávolítás",
    },
    error: {
      label: "Hiba:",
      detailsLabel: "Részletek:",
    },
    buttons: {
      convert: "Konverzió indítása",
      processing: "Feldolgozás...",
      clear: "Törlés",
    },
  },

  drawer: {
    trigger_one: "🗃️ Tömörített kép megjelenítése",
    trigger_other: "🗃️ Tömörített képek megjelenítése",
    title_one: "Tömörített kép",
    title_other: "Tömörített képek",
    description_one: "Töltsd le a tömörített képedet.",
    description_other: "Töltsd le a tömörített képeidet egyenként vagy egyszerre.",
    downloadAll: "Összes letöltése ZIP-ben",
    close: "Bezárás",
    downloadingFile: "{{fileName}} letöltése...",
  },

  storage: {
    title: "Tárhely-kezelés",
    used: "Használt:",
    available: "Szabad:",
    files: "Fájlok",
    clearButton: "Feldolgozott fájlok törlése",
    totalFiles: "Összes fájl:",
    totalSpace: "Felhasznált tárhely:",
    noFiles: "Nem található konvertált fájl.",
    confirmTitle: "Fájltörlés megerősítése",
    confirmDescription:
      "Ez a művelet véglegesen törli az összes feldolgozott fájlt. Győződj meg róla, hogy letöltötted a szükséges fájlokat, mivel ez a művelet nem vonható vissza.",
    confirmCancel: "Mégse",
    confirmDelete: "Igen, törlöm a fájlokat",
    fetchError: "Nem sikerült lekérni a tároló fájljait.",
    storageError: "Nem sikerült lekérni a tárhelyinformációkat.",
    zipLabel: "(ZIP)",
  },

  statusBanner: {
    warning: "Figyelem: A háttérrendszer jelenleg nem elérhető.",
  },

  statusFloating: {
    title: "Rendszer- és kapcsolatstátusz",
    backend: "Tároló háttérrendszer:",
    network: "Hálózati hozzáférés:",
    mode: "Mód:",
    backendDown: "Nem elérhető ❌",
    backendUp: "Működik",
    internetYes: "Van internet-hozzáférés",
    internetNo: "Nincs internet 🚫",
    internetUnknown: "Nem ellenőrzött",
    checkButton: "Internet ellenőrzése",
    checking: "Ellenőrzés...",
    whyTitle: "Miért van ez itt?",
    whyDesc:
      "Ellenőrzi a tároló állapotát és a hálózati izoláltságot a biztonság érdekében. Semmilyen kép vagy metaadat nem hagyja el a gépedet.",
    backendLastCheck: "Háttérrendszer utolsó ellenőrzése:",
    internetLastCheck: "Internet utolsó ellenőrzése:",
  },

  errorModal: {
    title: "Hiba történt",
    notifyDeveloper:
      "A hiba részleteit kimásolhatod helyi hibakereséshez.",
    copyError: "Hiba másolása",
    copied: "Másolva!",
    close: "Bezárás",
  },

  formatsDialog: {
    triggerButton: "Mit tudok megnyitni?",
    title: "Támogatott fájlok",
    descriptionStart:
      "Íme egy összefoglaló arról, mit tudok megnyitni. A kimeneti formátumot a",
    descriptionBold: "Kimeneti formátum",
    descriptionEnd: "menüben választhatod meg a főképernyőn, miután bezárod ezt.",
    searchLabel: "Listakeresés",
    searchHint: "Csak kezdj el gépelni a formátum megkereséséhez",
    searchPlaceholder: "Keresés (pl. webp, tiff)...",
    verifiedTitle: "Tesztelt és működő",
    unverifiedTitle: "Egyéb lehetséges formátumok",
    unverifiedHint: "Ezeket még nem teszteltük teljesen, de előfordulhat, hogy működnek!",
    footerText: "A DietPixels az imgproxy-t használja konverzióra és tömörítésre.",
  },

  footer: {
    recommendations: {
      imgcompress: {
        title: "Karimz imgcompress",
        description: "Az eredeti munkafolyamat, amelyből ez a kis wrapper inspirálódott.",
      },
      imgproxy: {
        title: "imgproxy",
        description: "A Go alapú képfeldolgozó motor, amely a konverziót és tömörítést végzi.",
      },
    },
  },

  langSwitcher: {
    ariaLabel: "Nyelv váltása",
  },
};
