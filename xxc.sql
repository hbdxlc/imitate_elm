/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : xxc

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2018-03-27 17:15:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cms_article`
-- ----------------------------
DROP TABLE IF EXISTS `cms_article`;
CREATE TABLE `cms_article` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(64) NOT NULL COMMENT '栏目id',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` mediumtext NOT NULL COMMENT '文章正文',
  `create_by` varchar(64) NOT NULL COMMENT '创建者',
  `create_date` varchar(64) NOT NULL COMMENT '创建时间',
  `del_flag` varchar(2) NOT NULL DEFAULT '0' COMMENT '是否删除（0未删除1删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cms_article
-- ----------------------------
INSERT INTO `cms_article` VALUES ('1', '2', '企业文化', '企业理念：诚信&nbsp; 规范&nbsp; 创新&nbsp; 高效&nbsp;企业使命：智慧改变生活&nbsp; 数据承载未来&nbsp; 发展智慧产业&nbsp; 展现科技力量&nbsp;企业愿景：创立信息化领域的著名品牌，成为最优秀的软件产品和大数据应用服务商&nbsp;企业精神：博学&nbsp; 慎思&nbsp; 笃行&nbsp; 创新&nbsp;质量方针：规范开发&nbsp; 优质服务&nbsp; 管理求精&nbsp; 持续改进', 'a', '2018-3-20', '0');

-- ----------------------------
-- Table structure for `sys_category`
-- ----------------------------
DROP TABLE IF EXISTS `sys_category`;
CREATE TABLE `sys_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `parent_id` varchar(64) NOT NULL COMMENT '父级编号',
  `name` varchar(100) NOT NULL COMMENT '栏目名称',
  `href` varchar(255) NOT NULL COMMENT '链接',
  `in_menu` char(1) NOT NULL COMMENT '是否在栏目显示（1显示，0不显示）',
  `create_by` varchar(64) NOT NULL COMMENT '创建时间',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标记(0未删除，1删除)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_category
-- ----------------------------
INSERT INTO `sys_category` VALUES ('1', '0', '首页', '/', '1', '2018-3-20', '0');
INSERT INTO `sys_category` VALUES ('2', '0', '认识福美', '/rsfm', '1', '2018-3-26', '0');
INSERT INTO `sys_category` VALUES ('4', '0', '企业新闻', '/qyxw', '1', '2018-3-19', '0');
INSERT INTO `sys_category` VALUES ('5', '0', '产品中心', '/cpzx', '1', '2018-3-19', '0');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL COMMENT '登录名',
  `password` varchar(12) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'a', '123');
