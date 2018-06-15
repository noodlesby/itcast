/*
Navicat MySQL Data Transfer

Source Server         : 47.96.21.88
Source Server Version : 50638
Source Host           : 47.96.21.88:3306
Source Database       : mydb

Target Server Type    : MYSQL
Target Server Version : 50638
File Encoding         : 65001

Date: 2018-05-16 11:35:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sp_report_1
-- ----------------------------
DROP TABLE IF EXISTS `sp_report_1`;
CREATE TABLE `sp_report_1` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `rp1_user_count` int(8) DEFAULT NULL COMMENT '用户数',
  `rp1_area` varchar(128) DEFAULT NULL COMMENT '地区',
  `rp1_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sp_report_1
-- ----------------------------
INSERT INTO `sp_report_1` VALUES ('1', '2999', '华东', '2017-12-27');
INSERT INTO `sp_report_1` VALUES ('2', '5090', '华南', '2017-12-27');
INSERT INTO `sp_report_1` VALUES ('3', '6888', '华北', '2017-12-27');
INSERT INTO `sp_report_1` VALUES ('4', '9991', '西部', '2017-12-27');
INSERT INTO `sp_report_1` VALUES ('5', '15212', '其他', '2017-12-27');
INSERT INTO `sp_report_1` VALUES ('6', '3111', '华东', '2017-12-28');
INSERT INTO `sp_report_1` VALUES ('8', '2500', '华南', '2017-12-28');
INSERT INTO `sp_report_1` VALUES ('9', '4000', '华北', '2017-12-28');
INSERT INTO `sp_report_1` VALUES ('10', '4130', '西部', '2017-12-28');
INSERT INTO `sp_report_1` VALUES ('11', '5800', '其他', '2017-12-28');
INSERT INTO `sp_report_1` VALUES ('12', '4100', '华东', '2017-12-29');
INSERT INTO `sp_report_1` VALUES ('13', '3400', '华南', '2017-12-29');
INSERT INTO `sp_report_1` VALUES ('14', '8010', '华北', '2017-12-29');
INSERT INTO `sp_report_1` VALUES ('15', '7777', '西部', '2017-12-29');
INSERT INTO `sp_report_1` VALUES ('16', '10241', '其他', '2017-12-29');
INSERT INTO `sp_report_1` VALUES ('17', '3565', '华东', '2017-12-30');
INSERT INTO `sp_report_1` VALUES ('18', '6000', '华南', '2017-12-30');
INSERT INTO `sp_report_1` VALUES ('19', '12321', '华北', '2017-12-30');
INSERT INTO `sp_report_1` VALUES ('20', '12903', '西部', '2017-12-30');
INSERT INTO `sp_report_1` VALUES ('21', '14821', '其他', '2017-12-30');
INSERT INTO `sp_report_1` VALUES ('22', '3528', '华东', '2017-12-31');
INSERT INTO `sp_report_1` VALUES ('23', '6400', '华南', '2017-12-31');
INSERT INTO `sp_report_1` VALUES ('24', '13928', '华北', '2017-12-31');
INSERT INTO `sp_report_1` VALUES ('25', '13098', '西部', '2017-12-31');
INSERT INTO `sp_report_1` VALUES ('26', '15982', '其他', '2017-12-31');
INSERT INTO `sp_report_1` VALUES ('27', '6000', '华东', '2018-01-01');
INSERT INTO `sp_report_1` VALUES ('28', '7800', '华南', '2018-01-01');
INSERT INTO `sp_report_1` VALUES ('29', '12984', '华北', '2018-01-01');
INSERT INTO `sp_report_1` VALUES ('30', '14028', '西部', '2018-01-01');
INSERT INTO `sp_report_1` VALUES ('31', '14091', '其他', '2018-01-01');
INSERT INTO `sp_report_1` VALUES ('32', '13333', '华东', '2018-01-02');
INSERT INTO `sp_report_1` VALUES ('33', '1212', '华南', '2018-01-03');
INSERT INTO `sp_report_1` VALUES ('34', '12121', '华北', '2018-01-03');
INSERT INTO `sp_report_1` VALUES ('35', '12121', '西部', '2018-01-03');
INSERT INTO `sp_report_1` VALUES ('36', '11111', '其他', '2018-01-03');

-- ----------------------------
-- Table structure for sp_report_2
-- ----------------------------
DROP TABLE IF EXISTS `sp_report_2`;
CREATE TABLE `sp_report_2` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `rp2_page` varchar(128) DEFAULT NULL,
  `rp2_count` int(8) DEFAULT NULL,
  `rp2_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sp_report_2
-- ----------------------------
INSERT INTO `sp_report_2` VALUES ('1', '首页', '2001', '2017-12-28');
INSERT INTO `sp_report_2` VALUES ('2', '分类', '2401', '2017-12-28');
INSERT INTO `sp_report_2` VALUES ('3', '商品列表', '2410', '2017-12-28');
INSERT INTO `sp_report_2` VALUES ('4', '商品详情', '4512', '2017-12-28');
INSERT INTO `sp_report_2` VALUES ('5', '首页', '2311', '2017-12-29');
INSERT INTO `sp_report_2` VALUES ('6', '分类', '3941', '2017-12-29');
INSERT INTO `sp_report_2` VALUES ('7', '商品列表', '4312', '2017-12-29');
INSERT INTO `sp_report_2` VALUES ('8', '商品详情', '1231', '2017-12-29');
INSERT INTO `sp_report_2` VALUES ('9', '首页', '2391', '2017-12-27');
INSERT INTO `sp_report_2` VALUES ('10', '分类', '1232', '2017-12-27');
INSERT INTO `sp_report_2` VALUES ('11', '商品列表', '1232', '2017-12-27');
INSERT INTO `sp_report_2` VALUES ('12', '商品详情', '1231', '2017-12-27');
INSERT INTO `sp_report_2` VALUES ('13', '首页', '2440', '2017-12-26');
INSERT INTO `sp_report_2` VALUES ('14', '分类', '3468', '2017-12-26');
INSERT INTO `sp_report_2` VALUES ('15', '商品列表', '3022', '2017-12-26');
INSERT INTO `sp_report_2` VALUES ('16', '商品详情', '3704', '2017-12-26');
INSERT INTO `sp_report_2` VALUES ('17', '首页', '2455', '2017-12-25');
INSERT INTO `sp_report_2` VALUES ('18', '分类', '3165', '2017-12-25');
INSERT INTO `sp_report_2` VALUES ('19', '商品列表', '1458', '2017-12-25');
INSERT INTO `sp_report_2` VALUES ('20', '商品详情', '2799', '2017-12-25');
INSERT INTO `sp_report_2` VALUES ('21', '首页', '2619', '2017-12-24');
INSERT INTO `sp_report_2` VALUES ('22', '分类', '3697', '2017-12-24');
INSERT INTO `sp_report_2` VALUES ('23', '商品列表', '3630', '2017-12-24');
INSERT INTO `sp_report_2` VALUES ('24', '商品详情', '3060', '2017-12-24');
INSERT INTO `sp_report_2` VALUES ('25', '首页', '3412', '2017-12-23');
INSERT INTO `sp_report_2` VALUES ('26', '分类', '3880', '2017-12-23');
INSERT INTO `sp_report_2` VALUES ('27', '商品列表', '2166', '2017-12-23');
INSERT INTO `sp_report_2` VALUES ('28', '商品详情', '1187', '2017-12-23');
INSERT INTO `sp_report_2` VALUES ('29', '首页', '1439', '2017-12-22');
INSERT INTO `sp_report_2` VALUES ('30', '分类', '2636', '2017-12-22');
INSERT INTO `sp_report_2` VALUES ('31', '商品列表', '1862', '2017-12-22');
INSERT INTO `sp_report_2` VALUES ('32', '商品详情', '3401', '2017-12-22');
INSERT INTO `sp_report_2` VALUES ('33', '首页', '1421', '2017-12-21');
INSERT INTO `sp_report_2` VALUES ('34', '分类', '1904', '2017-12-21');
INSERT INTO `sp_report_2` VALUES ('35', '商品列表', '1258', '2017-12-21');
INSERT INTO `sp_report_2` VALUES ('36', '商品详情', '2576', '2017-12-21');
INSERT INTO `sp_report_2` VALUES ('37', '首页', '2108', '2017-12-20');
INSERT INTO `sp_report_2` VALUES ('38', '分类', '1811', '2017-12-20');
INSERT INTO `sp_report_2` VALUES ('39', '商品列表', '1730', '2017-12-20');
INSERT INTO `sp_report_2` VALUES ('40', '商品详情', '2220', '2017-12-20');
INSERT INTO `sp_report_2` VALUES ('41', '首页', '1910', '2017-12-19');
INSERT INTO `sp_report_2` VALUES ('42', '分类', '1891', '2017-12-19');
INSERT INTO `sp_report_2` VALUES ('43', '商品列表', '2724', '2017-12-19');
INSERT INTO `sp_report_2` VALUES ('44', '商品详情', '3949', '2017-12-19');
INSERT INTO `sp_report_2` VALUES ('45', '首页', '1571', '2017-12-18');
INSERT INTO `sp_report_2` VALUES ('46', '分类', '1011', '2017-12-18');
INSERT INTO `sp_report_2` VALUES ('47', '商品列表', '2342', '2017-12-18');
INSERT INTO `sp_report_2` VALUES ('48', '商品详情', '1679', '2017-12-18');
INSERT INTO `sp_report_2` VALUES ('49', '首页', '3370', '2017-12-17');
INSERT INTO `sp_report_2` VALUES ('50', '分类', '1813', '2017-12-17');
INSERT INTO `sp_report_2` VALUES ('51', '商品列表', '3953', '2017-12-17');
INSERT INTO `sp_report_2` VALUES ('52', '商品详情', '1328', '2017-12-17');
INSERT INTO `sp_report_2` VALUES ('53', '首页', '2780', '2017-12-16');
INSERT INTO `sp_report_2` VALUES ('54', '分类', '2917', '2017-12-16');
INSERT INTO `sp_report_2` VALUES ('55', '商品列表', '2244', '2017-12-16');
INSERT INTO `sp_report_2` VALUES ('56', '商品详情', '1472', '2017-12-16');
INSERT INTO `sp_report_2` VALUES ('57', '首页', '2627', '2017-12-15');
INSERT INTO `sp_report_2` VALUES ('58', '分类', '1719', '2017-12-15');
INSERT INTO `sp_report_2` VALUES ('59', '商品列表', '2713', '2017-12-15');
INSERT INTO `sp_report_2` VALUES ('60', '商品详情', '1412', '2017-12-15');
INSERT INTO `sp_report_2` VALUES ('61', '首页', '3919', '2017-12-14');
INSERT INTO `sp_report_2` VALUES ('62', '分类', '2360', '2017-12-14');
INSERT INTO `sp_report_2` VALUES ('63', '商品列表', '2045', '2017-12-14');
INSERT INTO `sp_report_2` VALUES ('64', '商品详情', '2144', '2017-12-14');
INSERT INTO `sp_report_2` VALUES ('65', '首页', '3586', '2017-12-13');
INSERT INTO `sp_report_2` VALUES ('66', '分类', '1498', '2017-12-13');
INSERT INTO `sp_report_2` VALUES ('67', '商品列表', '1733', '2017-12-13');
INSERT INTO `sp_report_2` VALUES ('68', '商品详情', '3174', '2017-12-13');
INSERT INTO `sp_report_2` VALUES ('69', '首页', '3668', '2017-12-12');
INSERT INTO `sp_report_2` VALUES ('70', '分类', '1818', '2017-12-12');
INSERT INTO `sp_report_2` VALUES ('71', '商品列表', '3087', '2017-12-12');
INSERT INTO `sp_report_2` VALUES ('72', '商品详情', '2980', '2017-12-12');
INSERT INTO `sp_report_2` VALUES ('73', '首页', '1641', '2017-12-11');
INSERT INTO `sp_report_2` VALUES ('74', '分类', '1263', '2017-12-11');
INSERT INTO `sp_report_2` VALUES ('75', '商品列表', '3396', '2017-12-11');
INSERT INTO `sp_report_2` VALUES ('76', '商品详情', '3191', '2017-12-11');
INSERT INTO `sp_report_2` VALUES ('77', '首页', '1769', '2017-12-10');
INSERT INTO `sp_report_2` VALUES ('78', '分类', '1269', '2017-12-10');
INSERT INTO `sp_report_2` VALUES ('79', '商品列表', '3041', '2017-12-10');
INSERT INTO `sp_report_2` VALUES ('80', '商品详情', '1396', '2017-12-10');
INSERT INTO `sp_report_2` VALUES ('81', '首页', '2860', '2017-12-01');
INSERT INTO `sp_report_2` VALUES ('82', '分类', '3111', '2017-12-01');
INSERT INTO `sp_report_2` VALUES ('83', '商品列表', '2975', '2017-12-01');
INSERT INTO `sp_report_2` VALUES ('84', '商品详情', '1542', '2017-12-01');
INSERT INTO `sp_report_2` VALUES ('85', '首页', '3786', '2017-12-02');
INSERT INTO `sp_report_2` VALUES ('86', '分类', '1304', '2017-12-02');
INSERT INTO `sp_report_2` VALUES ('87', '商品列表', '3163', '2017-12-02');
INSERT INTO `sp_report_2` VALUES ('88', '商品详情', '1903', '2017-12-02');
INSERT INTO `sp_report_2` VALUES ('89', '首页', '2028', '2017-12-03');
INSERT INTO `sp_report_2` VALUES ('90', '分类', '3429', '2017-12-03');
INSERT INTO `sp_report_2` VALUES ('91', '商品列表', '1061', '2017-12-03');
INSERT INTO `sp_report_2` VALUES ('92', '商品详情', '3019', '2017-12-03');
INSERT INTO `sp_report_2` VALUES ('93', '首页', '1913', '2017-12-04');
INSERT INTO `sp_report_2` VALUES ('94', '分类', '2510', '2017-12-04');
INSERT INTO `sp_report_2` VALUES ('95', '商品列表', '2812', '2017-12-04');
INSERT INTO `sp_report_2` VALUES ('96', '商品详情', '2528', '2017-12-04');
INSERT INTO `sp_report_2` VALUES ('97', '首页', '3206', '2017-12-05');
INSERT INTO `sp_report_2` VALUES ('98', '分类', '1445', '2017-12-05');
INSERT INTO `sp_report_2` VALUES ('99', '商品列表', '2610', '2017-12-05');
INSERT INTO `sp_report_2` VALUES ('100', '商品详情', '1716', '2017-12-05');
INSERT INTO `sp_report_2` VALUES ('101', '首页', '2750', '2017-12-06');
INSERT INTO `sp_report_2` VALUES ('102', '分类', '1601', '2017-12-06');
INSERT INTO `sp_report_2` VALUES ('103', '商品列表', '1755', '2017-12-06');
INSERT INTO `sp_report_2` VALUES ('104', '商品详情', '2974', '2017-12-06');
INSERT INTO `sp_report_2` VALUES ('105', '首页', '2606', '2017-12-07');
INSERT INTO `sp_report_2` VALUES ('106', '分类', '3110', '2017-12-07');
INSERT INTO `sp_report_2` VALUES ('107', '商品列表', '3731', '2017-12-07');
INSERT INTO `sp_report_2` VALUES ('108', '商品详情', '2324', '2017-12-07');
INSERT INTO `sp_report_2` VALUES ('109', '首页', '2429', '2017-12-08');
INSERT INTO `sp_report_2` VALUES ('110', '分类', '1172', '2017-12-08');
INSERT INTO `sp_report_2` VALUES ('111', '商品列表', '3574', '2017-12-08');
INSERT INTO `sp_report_2` VALUES ('112', '商品详情', '1354', '2017-12-08');
INSERT INTO `sp_report_2` VALUES ('113', '首页', '1051', '2017-12-09');
INSERT INTO `sp_report_2` VALUES ('114', '分类', '3190', '2017-12-09');
INSERT INTO `sp_report_2` VALUES ('115', '商品列表', '2800', '2017-12-09');
INSERT INTO `sp_report_2` VALUES ('116', '商品详情', '3431', '2017-12-09');

-- ----------------------------
-- Table structure for sp_report_3
-- ----------------------------
DROP TABLE IF EXISTS `sp_report_3`;
CREATE TABLE `sp_report_3` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `rp3_src` varchar(127) DEFAULT NULL COMMENT '用户来源',
  `rp3_count` int(8) DEFAULT NULL COMMENT '数量',
  `rp3_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sp_report_3
-- ----------------------------
