import { db, client } from './index';
import { nodes } from './schema';
import type { NodeType } from '@windows-explorer/types';

type SeedNode = {
  name: string;
  type: NodeType;
  children?: SeedNode[];
};

const fileTree: SeedNode = {
  name: "C:",
  type: "FOLDER",
  children: [
    {
      name: "Windows",
      type: "FOLDER",
      children: [
        {
          name: "System32",
          type: "FOLDER",
          children: [
            { name: "cmd.exe", type: "FILE" },
            { name: "notepad.exe", type: "FILE" },
            { name: "taskmgr.exe", type: "FILE" },
            { name: "regedit.exe", type: "FILE" },
            { name: "calc.exe", type: "FILE" },
            { name: "mspaint.exe", type: "FILE" },
            { name: "drivers", type: "FOLDER", children: [
              { name: "etc", type: "FOLDER", children: [
                { name: "hosts", type: "FILE" },
                { name: "services", type: "FILE" },
              ]},
              { name: "usbhub.sys", type: "FILE" },
              { name: "ntfs.sys", type: "FILE" },
            ]},
          ],
        },
        {
          name: "Fonts",
          type: "FOLDER",
          children: [
            { name: "arial.ttf", type: "FILE" },
            { name: "arialbd.ttf", type: "FILE" },
            { name: "ariali.ttf", type: "FILE" },
            { name: "times.ttf", type: "FILE" },
            { name: "timesbd.ttf", type: "FILE" },
            { name: "cour.ttf", type: "FILE" },
            { name: "segoeui.ttf", type: "FILE" },
            { name: "calibri.ttf", type: "FILE" },
          ],
        },
        {
          name: "Temp",
          type: "FOLDER",
          children: [
            { name: "tmp001.tmp", type: "FILE" },
            { name: "tmp002.tmp", type: "FILE" },
          ],
        },
        { name: "explorer.exe", type: "FILE" },
        { name: "winlogon.exe", type: "FILE" },
      ],
    },
    {
      name: "Program Files",
      type: "FOLDER",
      children: [
        {
          name: "nodejs",
          type: "FOLDER",
          children: [
            { name: "node.exe", type: "FILE" },
            { name: "npm.cmd", type: "FILE" },
            { name: "node_modules", type: "FOLDER", children: [
              { name: "npm", type: "FOLDER", children: [
                { name: "package.json", type: "FILE" },
              ]},
            ]},
          ],
        },
        {
          name: "Git",
          type: "FOLDER",
          children: [
            { name: "bin", type: "FOLDER", children: [
              { name: "git.exe", type: "FILE" },
              { name: "git-bash.exe", type: "FILE" },
            ]},
            { name: "cmd", type: "FOLDER", children: [
              { name: "git.cmd", type: "FILE" },
            ]},
            { name: "usr", type: "FOLDER", children: [
              { name: "bin", type: "FOLDER", children: [
                { name: "bash.exe", type: "FILE" },
                { name: "ssh.exe", type: "FILE" },
                { name: "curl.exe", type: "FILE" },
              ]},
            ]},
          ],
        },
        {
          name: "Google",
          type: "FOLDER",
          children: [
            { name: "Chrome", type: "FOLDER", children: [
              { name: "Application", type: "FOLDER", children: [
                { name: "chrome.exe", type: "FILE" },
                { name: "chrome_proxy.exe", type: "FILE" },
              ]},
            ]},
          ],
        },
        {
          name: "Microsoft Office",
          type: "FOLDER",
          children: [
            { name: "Office16", type: "FOLDER", children: [
              { name: "WINWORD.EXE", type: "FILE" },
              { name: "EXCEL.EXE", type: "FILE" },
              { name: "POWERPNT.EXE", type: "FILE" },
              { name: "OUTLOOK.EXE", type: "FILE" },
            ]},
          ],
        },
        {
          name: "7-Zip",
          type: "FOLDER",
          children: [
            { name: "7z.exe", type: "FILE" },
            { name: "7z.dll", type: "FILE" },
            { name: "7zFM.exe", type: "FILE" },
          ],
        },
      ],
    },
    {
      name: "Program Files (x86)",
      type: "FOLDER",
      children: [
        {
          name: "Steam",
          type: "FOLDER",
          children: [
            { name: "steam.exe", type: "FILE" },
            { name: "steamapps", type: "FOLDER", children: [
              { name: "common", type: "FOLDER", children: [
                { name: "Half-Life 2", type: "FOLDER", children: [
                  { name: "hl2.exe", type: "FILE" },
                ]},
                { name: "Counter-Strike 2", type: "FOLDER", children: [
                  { name: "cs2.exe", type: "FILE" },
                ]},
              ]},
            ]},
          ],
        },
      ],
    },
    {
      name: "Users",
      type: "FOLDER",
      children: [
        {
          name: "jigsaw",
          type: "FOLDER",
          children: [
            {
              name: "Desktop",
              type: "FOLDER",
              children: [
                { name: "shortcut_chrome.lnk", type: "FILE" },
                { name: "budget_2025.xlsx", type: "FILE" },
                { name: "todo.txt", type: "FILE" },
              ],
            },
            {
              name: "Documents",
              type: "FOLDER",
              children: [
                { name: "passwords.txt", type: "FILE" },
                { name: "resume.docx", type: "FILE" },
                { name: "taxes_2024.pdf", type: "FILE" },
                { name: "Projects", type: "FOLDER", children: [
                  { name: "windows-explorer", type: "FOLDER", children: [
                    { name: "README.md", type: "FILE" },
                    { name: "package.json", type: "FILE" },
                  ]},
                  { name: "portfolio", type: "FOLDER", children: [
                    { name: "index.html", type: "FILE" },
                    { name: "style.css", type: "FILE" },
                  ]},
                ]},
                { name: "Notes", type: "FOLDER", children: [
                  { name: "meeting_notes.txt", type: "FILE" },
                  { name: "ideas.txt", type: "FILE" },
                ]},
              ],
            },
            {
              name: "Downloads",
              type: "FOLDER",
              children: [
                { name: "setup_vscode.exe", type: "FILE" },
                { name: "ubuntu-24.04.iso", type: "FILE" },
                { name: "invoice_march.pdf", type: "FILE" },
                { name: "wallpaper_dark.png", type: "FILE" },
              ],
            },
            {
              name: "Pictures",
              type: "FOLDER",
              children: [
                { name: "Camera Roll", type: "FOLDER", children: [
                  { name: "IMG_0001.jpg", type: "FILE" },
                  { name: "IMG_0002.jpg", type: "FILE" },
                  { name: "IMG_0003.jpg", type: "FILE" },
                ]},
                { name: "Screenshots", type: "FOLDER", children: [
                  { name: "screenshot_2025-01-10.png", type: "FILE" },
                  { name: "screenshot_2025-02-14.png", type: "FILE" },
                ]},
                { name: "Wallpapers", type: "FOLDER", children: [
                  { name: "mountain.jpg", type: "FILE" },
                  { name: "neon_city.png", type: "FILE" },
                ]},
              ],
            },
            {
              name: "Music",
              type: "FOLDER",
              children: [
                { name: "Favorites", type: "FOLDER", children: [
                  { name: "lofi_playlist.mp3", type: "FILE" },
                  { name: "coding_mix.mp3", type: "FILE" },
                ]},
              ],
            },
            {
              name: "Videos",
              type: "FOLDER",
              children: [
                { name: "tutorial_docker.mp4", type: "FILE" },
                { name: "screen_record_demo.mkv", type: "FILE" },
              ],
            },
            {
              name: "AppData",
              type: "FOLDER",
              children: [
                { name: "Local", type: "FOLDER", children: [
                  { name: "Temp", type: "FOLDER", children: [
                    { name: "cache_001.tmp", type: "FILE" },
                  ]},
                  { name: "Google", type: "FOLDER", children: [
                    { name: "Chrome", type: "FOLDER", children: [
                      { name: "User Data", type: "FOLDER", children: [
                        { name: "Default", type: "FOLDER", children: [
                          { name: "Bookmarks", type: "FILE" },
                          { name: "History", type: "FILE" },
                          { name: "Cookies", type: "FILE" },
                        ]},
                      ]},
                    ]},
                  ]},
                ]},
                { name: "Roaming", type: "FOLDER", children: [
                  { name: "Code", type: "FOLDER", children: [
                    { name: "User", type: "FOLDER", children: [
                      { name: "settings.json", type: "FILE" },
                      { name: "keybindings.json", type: "FILE" },
                    ]},
                  ]},
                ]},
              ],
            },
          ],
        },
        {
          name: "Public",
          type: "FOLDER",
          children: [
            { name: "Desktop", type: "FOLDER", children: [] },
            { name: "Documents", type: "FOLDER", children: [
              { name: "shared_notes.txt", type: "FILE" },
            ]},
            { name: "Downloads", type: "FOLDER", children: [] },
          ],
        },
      ],
    },
  ],
};

const insertNode = async (node: SeedNode, parentId?: string) => {
  const result = await db.insert(nodes).values({
    name: node.name,
    type: node.type,
    parentId: parentId || null,
  }).returning();

  const insertedId = result[0].id;

  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      await insertNode(child, insertedId);
    }
  }
};

const seed = async () => {
    try {
        console.log("Seeding database...");
        await db.delete(nodes);
        await insertNode(fileTree);
        console.log("Database seeded successfully.");
    } catch (e) {
        console.error("Failed to seed database: ", e);
    } finally {
        await client.end();
        process.exit(0);
    }
}

seed();
