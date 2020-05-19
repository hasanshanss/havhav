using System.Collections.Generic;
using System.IO;
using System.Xml;
using HtmlAgilityPack;

namespace HavhavAz.Helpers
{
    public static class HtmlSanitizer
    {

        public static HashSet<string> AllowedList = new HashSet<string>()
        {
            //{ "script" },
            //{ "iframe" },
            //{ "form" },
            //{ "object" },
            //{ "embed" },
            //{ "link" },
            //{ "head" },
            //{ "meta" }

            //{ "br" },
            { "i" }
        };

        public static string Sanitize(string html, string[] allowedTags = null)
        {
            if (allowedTags != null)
            {
                foreach (string allowedTag in allowedTags)
                {
                    AllowedList.Add(allowedTag);
                }
            }
            
            var doc = new HtmlDocument();

            doc.LoadHtml(html);
            SanitizeHtmlNode(doc.DocumentNode);

            //return doc.DocumentNode.WriteTo();

            string output = null;

            // Use an XmlTextWriter to create self-closing tags
            using (StringWriter sw = new StringWriter())
            {
                XmlWriter writer = new XmlTextWriter(sw);
                doc.DocumentNode.WriteTo(writer);
                output = sw.ToString();

                // strip off XML doc header
                if (!string.IsNullOrEmpty(output))
                {
                    int at = output.IndexOf("?>");
                    output = output.Substring(at + 2);
                }

                writer.Close();
            }
            doc = null;

            return output;
        }

        private static void SanitizeHtmlNode(HtmlNode node)
        {
            if (node.NodeType == HtmlNodeType.Element)
            {
                // check for blacklist items and remove
                if (!AllowedList.Contains(node.Name))
                {
                    node.Remove();
                    return;
                }

                // remove CSS Expressions and embedded script links
                if (node.Name == "style")
                {
                    if (string.IsNullOrEmpty(node.InnerText))
                    {
                        if (node.InnerHtml.Contains("expression") || node.InnerHtml.Contains("javascript:"))
                            node.ParentNode.RemoveChild(node);
                    }
                }

                // remove script attributes
                if (node.HasAttributes)
                {
                    for (int i = node.Attributes.Count - 1; i >= 0; i--)
                    {
                        HtmlAttribute currentAttribute = node.Attributes[i];

                        var attr = currentAttribute.Name.ToLower();
                        var val = currentAttribute.Value.ToLower();

                        if (attr.StartsWith("on"))
                            node.Attributes.Remove(currentAttribute);

                        // remove script links
                        else if (
                                 //(attr == "href" || attr== "src" || attr == "dynsrc" || attr == "lowsrc") &&
                                 val != null &&
                                 val.Contains("javascript:"))
                            node.Attributes.Remove(currentAttribute);

                        // Remove CSS Expressions
                        else if (attr == "style" &&
                                 val != null &&
                                 val.Contains("expression") || val.Contains("javascript:") || val.Contains("vbscript:"))
                            node.Attributes.Remove(currentAttribute);
                    }
                }
            }

            // Look through child nodes recursively
            if (node.HasChildNodes)
            {
                for (int i = node.ChildNodes.Count - 1; i >= 0; i--)
                {
                    SanitizeHtmlNode(node.ChildNodes[i]);
                }
            }
        }
    }
}