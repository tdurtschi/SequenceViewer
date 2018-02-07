﻿using System.Web;
using System.Web.Optimization;

namespace ProteinViewer
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/ProteinSearch.js",
                "~/Scripts/AddProteinViewModel.js",
                "~/Scripts/ProteinViewerViewModel.js",
                "~/Scripts/knockout-entry-point.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/ProteinViewerAjaxClient.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/site.css"));
        }
    }
}
