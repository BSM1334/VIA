import fs from "fs-extra";

const DB_PATH = "./data/reports.json";

// GET REPORTS
export async function getReports(req, res) {
    const reports = await fs.readJson(DB_PATH).catch(() => []);
    res.json(reports);
}

// ADD REPORT
export async function addReport(req, res) {
    const reports = await fs.readJson(DB_PATH).catch(() => []);

    const newReport = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    ...req.body
    };

    reports.push(newReport);

    await fs.writeJson(DB_PATH, reports, { spaces: 2 });

    res.json({ success: true, report: newReport });
}
