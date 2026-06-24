using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Runtime.InteropServices;

namespace SubtitleFlow
{
    class Installer
    {
        [DllImport("kernel32.dll")]
        static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        const int SW_MAXIMIZE = 3;

        static string Version = "1.0.0";
        static string ZipUrl = "https://syedsadique-git.github.io/SubtitleFlow/downloads/subtitleflow-extension-v" + Version + ".zip";
        static string ExtName = "SubtitleFlow";
        static string DownloadDir = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            "Downloads"
        );
        static string ExtractDir = Path.Combine(DownloadDir, ExtName + "-extension");
        static string ZipPath = Path.Combine(DownloadDir, ExtName + "-v" + Version + ".zip");

        static void Main()
        {
            Console.Title = "SubtitleFlow " + Version + " - Windows Installer";
            try { ShowWindow(GetConsoleWindow(), SW_MAXIMIZE); } catch { }

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("  ============================================");
            Console.WriteLine("     SubtitleFlow Extension Installer");
            Console.WriteLine("     AI-Powered Real-Time Subtitle Translation");
            Console.WriteLine("  ============================================");
            Console.ResetColor();
            Console.WriteLine();

            if (!IsAdministrator())
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("  [!] NOT running as Administrator.");
                Console.WriteLine("  [*] Some browsers may require admin privileges.");
                Console.ResetColor();
                Console.WriteLine();
            }

            Console.WriteLine("  Version: " + Version);
            Console.WriteLine("  Platform: " + Environment.OSVersion);
            Console.WriteLine("  Download: " + ExtractDir);
            Console.WriteLine();

            if (!DownloadExtension())
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("  [ERROR] Download failed. Check your internet connection.");
                Console.ResetColor();
                Pause();
                return;
            }

            if (!ExtractExtension())
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("  [ERROR] Extraction failed.");
                Console.ResetColor();
                Pause();
                return;
            }

            OpenFolder();
            DetectBrowser();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine();
            Console.WriteLine("  ============================================");
            Console.WriteLine("           INSTALLATION COMPLETE!");
            Console.WriteLine("  ============================================");
            Console.ResetColor();
            Console.WriteLine();
            Console.WriteLine("  NEXT STEPS:");
            Console.WriteLine("  1. In the Extensions page, enable \"Developer mode\"");
            Console.WriteLine("  2. Click \"Load unpacked\"");
            Console.WriteLine("  3. Select: " + ExtractDir);
            Console.WriteLine("  4. SubtitleFlow will appear in your extensions!");
            Console.WriteLine();

            Pause();
        }

        static bool DownloadExtension()
        {
            Console.Write("  [1/4] Downloading extension...");

            try
            {
                using (var client = new WebClient())
                {
                    client.Headers.Add("User-Agent", "SubtitleFlow-Installer");
                    client.DownloadProgressChanged += (s, e) =>
                    {
                        Console.Write("\r  [1/4] Downloading... " + e.ProgressPercentage + "%    ");
                    };
                    client.DownloadFileTaskAsync(new Uri(ZipUrl), ZipPath).Wait();
                }
                Console.WriteLine("\r  [1/4] Download complete! (" + (new FileInfo(ZipPath).Length / 1024) + " KB)   ");
                return true;
            }
            catch
            {
                try
                {
                    using (var client = new WebClient())
                    {
                        client.Headers.Add("User-Agent", "SubtitleFlow-Installer");
                        client.DownloadFile(ZipUrl, ZipPath);
                    }
                    Console.WriteLine("\r  [1/4] Download complete! (" + (new FileInfo(ZipPath).Length / 1024) + " KB)   ");
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("\r  [1/4] Failed: " + ex.Message);
                    return false;
                }
            }
        }

        static bool ExtractExtension()
        {
            Console.Write("  [2/4] Extracting extension files...");

            try
            {
                if (Directory.Exists(ExtractDir))
                {
                    Directory.Delete(ExtractDir, true);
                }
                ZipFile.ExtractToDirectory(ZipPath, ExtractDir);
                Console.WriteLine("\r  [2/4] Extracted to " + ExtractDir);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("\r  [2/4] Failed: " + ex.Message);
                return false;
            }
        }

        static void OpenFolder()
        {
            Console.WriteLine("  [3/4] Opening extension folder...");
            try
            {
                Process.Start("explorer.exe", ExtractDir);
            }
            catch { }
        }

        static void DetectBrowser()
        {
            string[] browserNames = { "Chrome", "Edge", "Firefox", "Brave" };
            string[] browserExes = {
                @"Google\Chrome\Application\chrome.exe",
                @"Microsoft\Edge\Application\msedge.exe",
                @"Mozilla Firefox\firefox.exe",
                @"BraveSoftware\Brave-Browser\Application\brave.exe",
            };
            string[] browserArgs = {
                "chrome://extensions",
                "edge://extensions",
                "about:debugging#/runtime/this-firefox",
                "brave://extensions",
            };

            string programFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string programFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);
            string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);

            Console.WriteLine("  [4/4] Detecting browser...");

            for (int i = 0; i < browserExes.Length; i++)
            {
                string[] paths = {
                    Path.Combine(localAppData, browserExes[i]),
                    Path.Combine(programFiles, browserExes[i]),
                    Path.Combine(programFilesX86 ?? "", browserExes[i]),
                };

                foreach (var path in paths)
                {
                    if (File.Exists(path))
                    {
                        try
                        {
                            Process.Start(path, browserArgs[i]);
                            Console.WriteLine("  [4/4] Detected " + browserNames[i] + " - opening extensions page");
                            return;
                        }
                        catch { }
                    }
                }
            }

            Console.WriteLine("  [4/4] No supported browser detected automatically.");
            Console.WriteLine("  [*] Open your browser's extensions page manually:");
            Console.WriteLine("      Chrome:  chrome://extensions");
            Console.WriteLine("      Edge:    edge://extensions");
            Console.WriteLine("      Firefox: about:debugging#/runtime/this-firefox");
            Console.WriteLine("      Brave:   brave://extensions");
        }

        static bool IsAdministrator()
        {
            try
            {
                var identity = System.Security.Principal.WindowsIdentity.GetCurrent();
                var principal = new System.Security.Principal.WindowsPrincipal(identity);
                return principal.IsInRole(System.Security.Principal.WindowsBuiltInRole.Administrator);
            }
            catch { return false; }
        }

        static void Pause()
        {
            Console.Write("  Press any key to exit...");
            Console.ReadKey(true);
        }
    }
}
