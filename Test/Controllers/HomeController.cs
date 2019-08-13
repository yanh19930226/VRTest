using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Test.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //读取文本文件中的字段盘段是否添加了特效
            ViewBag.Data = Read();
            return View();
        }
        /// <summary>
        /// 测试添加效果
        /// </summary>
        /// <param name="islittleplanet">小行星开场</param>
        /// <param name="effect">特效设置</param>
        /// <param name="bgmusic">背景音乐</param>
        /// <param name="multiscene">多个场景缩略图选择</param>
        /// <param name="voice">背景解说</param>
        /// <param name="autorotate">是否自动旋转</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Save(bool islittleplanet, string effect,bool bgmusic,bool multiscene,bool voice,bool autorotate)
        {
            if (islittleplanet)
            {
                Write("true", effect);
            }
            else
            {
                Write("false", effect);
            }
            return Json(new { status = "ok" });
        }



        /// <summary>
        /// 网站根目录下面保存Data
        /// </summary>
        /// <param name="AccessToken"></param>
        public void Write(string islittleplanet, string effect)
        {
            if (System.IO.File.Exists(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt"))
            {
                System.IO.File.Delete(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt");
                System.IO.File.WriteAllText(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt", islittleplanet+"," +effect);
            }
            else
            {
                System.IO.File.WriteAllText(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt", islittleplanet + "," + effect);
            }
        }
        /// <summary>
        /// 读取网站根目录下的Data
        /// </summary>
        /// <returns></returns>
        public string Read()
        {
            string path=System.Web.HttpRuntime.AppDomainAppPath + "Data.txt";
            if (System.IO.File.Exists(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt"))
            {
                return System.IO.File.ReadAllText(System.Web.HttpRuntime.AppDomainAppPath + "Data.txt");
            }
            return "";
        }
    }
}